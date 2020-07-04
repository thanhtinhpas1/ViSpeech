import { forwardRef, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CommandHandlers } from './commands/handlers';
import { ReportsController } from './controllers/reports.controller';
import { ReportDto } from './dtos/reports.dto';
import { EventHandlers } from './events/handlers';
import { ReportCreatedEvent, ReportCreatedFailedEvent, ReportCreatedSuccessEvent } from './events/impl/report-created.event';
import { ReportDeletedEvent, ReportDeletedFailedEvent, ReportDeletedSuccessEvent } from './events/impl/report-deleted.event';
import { ReportUpdatedEvent, ReportUpdatedFailedEvent, ReportUpdatedSuccessEvent } from './events/impl/report-updated.event';
import { ReportWelcomedEvent } from './events/impl/report-welcomed.event';
import { QueryHandlers } from './queries/handler';
import { ReportRepository } from './repository/report.repository';
import { ReportsSagas } from './sagas/reports.sagas';
import { ReportsService } from './services/reports.service';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { UserDto } from 'users/dtos/users.dto';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { ClientsModule } from '@nestjs/microservices';
import { kafkaClientOptions } from 'common/kafka-client.options';
import { config } from '../../config';
import { ProjectionDto } from '../core/event-store/lib/adapter/projection.dto';
import { EventStoreSubscriptionType } from '../core/event-store/lib/contract';
import { EventStore, EventStoreModule } from '../core/event-store/lib';

@Module({
    imports: [
        ClientsModule.register([{
            name: config.KAFKA.NAME,
            ...kafkaClientOptions,
        }]),
        TypeOrmModule.forFeature([
            ReportDto,
            TokenDto,
            TokenTypeDto,
            UserDto,
            ProjectDto,
            ProjectionDto
        ]),
        CqrsModule,
        EventStoreModule.registerFeature({
            featureStreamName: '$ce-report',
            subscriptions: [
                {
                    type: EventStoreSubscriptionType.CatchUp,
                    stream: '$ce-report',
                    resolveLinkTos: true, // Default is true (Optional)
                    lastCheckpoint: 13, // Default is 0 (Optional)
                },
                {
                    type: EventStoreSubscriptionType.Volatile,
                    stream: '$ce-report',
                },
                {
                    type: EventStoreSubscriptionType.Persistent,
                    stream: '$ce-report',
                    persistentSubscriptionName: 'steamName',
                    resolveLinkTos: true,  // Default is true (Optional)
                },
            ],
            eventHandlers: {
                ...ReportsModule.eventHandlers,
            },
        }),
        forwardRef(() => AuthModule),
    ],
    controllers: [ReportsController],
    providers: [
        ReportsService,
        ReportsSagas,
        ReportRepository,
        QueryBus, EventBus,
        CommandBus, EventPublisher,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
    ],
    exports: [ReportsService]
})
export class ReportsModule implements OnModuleInit, OnModuleDestroy {
    constructor(
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus,
        private readonly eventStore: EventStore,
    ) {
    }

    onModuleDestroy() {
        this.eventStore.close();
    }

    async onModuleInit() {
        await this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
        this.event$.publisher = this.eventStore;
        this.event$.register(EventHandlers);
        this.command$.register(CommandHandlers);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([ReportsSagas]);
    }

    public static eventHandlers = {
        // create
        ReportCreatedEvent: (streamId, data) => new ReportCreatedEvent(streamId, data),
        ReportCreatedSuccessEvent: (streamId, data) => new ReportCreatedSuccessEvent(streamId, data),
        ReportCreatedFailedEvent: (streamId, data, error) => new ReportCreatedFailedEvent(streamId, data, error),
        // delete
        ReportDeletedEvent: (streamId, data) => new ReportDeletedEvent(streamId, data),
        ReportDeletedSuccessEvent: (streamId, data) => new ReportDeletedSuccessEvent(streamId, data),
        ReportDeletedFailedEvent: (streamId, data, error) => new ReportDeletedFailedEvent(streamId, data, error),
        // update
        ReportUpdatedEvent: (streamId, data) => new ReportUpdatedEvent(streamId, data),
        ReportUpdatedSuccessEvent: (streamId, data) => new ReportUpdatedSuccessEvent(streamId, data),
        ReportUpdatedFailedEvent: (streamId, data, error) => new ReportUpdatedFailedEvent(streamId, data, error),
        ReportWelcomedEvent: (streamId, data) => new ReportWelcomedEvent(streamId, data)
    };
}
