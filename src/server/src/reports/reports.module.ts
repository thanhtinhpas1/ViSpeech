import { forwardRef, Logger, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { kafkaClientOptions } from 'common/kafka-client.options';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { getMongoRepository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';

import { config } from '../../config';
import { AuthModule } from '../auth/auth.module';
import { EventStore, EventStoreModule } from '../core/event-store/lib';
import { MongoStore } from '../core/event-store/lib/adapter/mongo-store';
import { ProjectionDto } from '../core/event-store/lib/adapter/projection.dto';
import { EventStoreSubscriptionType } from '../core/event-store/lib/contract';
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
            ProjectionDto,
            PermissionDto
        ]),
        CqrsModule,
        EventStoreModule.registerFeature({
            featureStreamName: CONSTANTS.STREAM_NAME.REPORT,
            subscriptions: [
                {
                    type: EventStoreSubscriptionType.CatchUp,
                    stream: CONSTANTS.STREAM_NAME.REPORT,
                    resolveLinkTos: true, // Default is true (Optional)
                    lastCheckpoint: 0, // Default is 0 (Optional)
                },
                // {
                //     type: EventStoreSubscriptionType.Persistent,
                //     stream: CONSTANTS.STREAM_NAME.REPORT,
                //     persistentSubscriptionName: CONSTANTS.STREAM_NAME.REPORT + '-' + config.HOST,
                //     resolveLinkTos: true,  // Default is true (Optional)
                // },
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
        MongoStore,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
    ],
    exports: [ReportsService]
})
export class ReportsModule implements OnModuleInit {
    constructor(
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus,
        private readonly eventStore: EventStore,
    ) {
    }

    async onModuleInit() {
        this.event$.publisher = this.eventStore;
        this.event$.register(EventHandlers);
        this.command$.register(CommandHandlers);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([ReportsSagas]);
        await this.seedProjection();
    }

    async seedProjection() {
        const streamName = CONSTANTS.STREAM_NAME.REPORT;
        const userProjection = await getMongoRepository(ProjectionDto).findOne({ streamName });
        if (userProjection) {
            await getMongoRepository(ProjectionDto).save({
                ...userProjection,
                expectedVersion: userProjection.eventNumber
            });
        } else {
            await getMongoRepository(ProjectionDto).save({
                streamName,
                eventNumber: 0,
                expectedVersion: CONSTANTS.INIT_EXPECTED_VERSION
            });
        }
        Logger.log('Seed projection report success');
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
