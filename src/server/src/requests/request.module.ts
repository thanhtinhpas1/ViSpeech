import { forwardRef, Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { kafkaClientOptions } from 'common/kafka-client.options';
import { OrderDto } from 'orders/dtos/orders.dto';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { CreateReportHandler } from 'reports/commands/handlers/create-report.handler';
import { ReportDto } from 'reports/dtos/reports.dto';
import { ReportRepository } from 'reports/repository/report.repository';
import { TaskDto } from 'tasks/dto/task.dto';
import { ConstTaskService } from 'tasks/services/const-task.service';
import { UpdateTokenHandler } from 'tokens/commands/handlers/update-token.handler';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenRepository } from 'tokens/repository/token.repository';
import { getMongoRepository } from 'typeorm';
import { config } from '../../config';
import { AuthModule } from '../auth/auth.module';
import { EventStore, EventStoreModule, EventStoreSubscriptionType } from '../core/event-store/lib';
import { MongoStore } from '../core/event-store/lib/adapter/mongo-store';
import { ProjectionDto } from '../core/event-store/lib/adapter/projection.dto';
import { TokenDto } from '../tokens/dtos/tokens.dto';
import { CommandHandlers } from './commands/handler';
import { HistoriesController } from './controllers/histories.controller';
import { AsrController } from './controllers/requests.controller';
import { RequestDto } from './dtos/requests.dto';
import { EventHandlers } from './events/handler';
import { AsrCalledRequestEvent } from './events/impl/asr-called-request.event';
import {
    RequestCreatedEvent,
    RequestCreatedFailedEvent,
    RequestCreatedSuccessEvent
} from './events/impl/request-created.event';
import {
    RequestTranscriptFileUrlUpdatedEvent,
    RequestTranscriptFileUrlUpdatedFailedEvent,
    RequestTranscriptFileUrlUpdatedSuccessEvent
} from './events/impl/request-transcript-file-url-updated.event';
import { QueryHandlers } from './queries/handler';
import { RequestRepository } from './repository/request.repository';
import { CallAsrSagas } from './sagas/call-asr.sagas';
import { RequestService } from './services/request.service';
import { CONSTANTS } from 'common/constant';
import { UserDto } from 'users/dtos/users.dto';

@Module({
    imports: [
        ClientsModule.register([{
            name: config.KAFKA.NAME,
            ...kafkaClientOptions,
        }]),
        TypeOrmModule.forFeature([
            ReportDto,
            TaskDto,
            RequestDto,
            TokenDto,
            TokenTypeDto,
            OrderDto,
            ProjectDto,
            UserDto,
            ProjectionDto
        ]),
        CqrsModule,
        EventStoreModule.registerFeature({
            featureStreamName: CONSTANTS.STREAM_NAME.REQUEST,
            subscriptions: [
                {
                    type: EventStoreSubscriptionType.CatchUp,
                    stream: CONSTANTS.STREAM_NAME.REQUEST,
                    resolveLinkTos: true, // Default is true (Optional)
                    lastCheckpoint: 0, // Default is 0 (Optional)
                },
                // {
                //     type: EventStoreSubscriptionType.Persistent,
                //     stream: CONSTANTS.STREAM_NAME.REQUEST,
                //     persistentSubscriptionName: CONSTANTS.STREAM_NAME.REQUEST + '-' + config.HOST,
                //     resolveLinkTos: true,  // Default is true (Optional)
                // },
            ],
            eventHandlers: {
                ...RequestModule.eventHandlers
            },
        }),
        forwardRef(() => AuthModule),
    ],
    controllers: [
        AsrController, HistoriesController,
    ],
    providers: [
        ConstTaskService,
        RequestService,
        CallAsrSagas,
        TokenRepository,
        RequestRepository,
        ReportRepository,
        UpdateTokenHandler,
        CreateReportHandler,
        QueryBus, EventBus,
        CommandBus, EventPublisher,
        MongoStore,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
    ],
})
export class RequestModule implements OnModuleInit, OnModuleDestroy {
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
        this.event$.publisher = this.eventStore;
        this.event$.register(EventHandlers);
        this.command$.register(CommandHandlers);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([CallAsrSagas]);
        await this.seedProjection();
    }

    async seedProjection() {
        const streamName = CONSTANTS.STREAM_NAME.REQUEST;
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
        Logger.log('Seed projection request success');
    }

    public static eventHandlers = {
        AsrCalledRequestEvent: (streamId, requestDto, tokenDto) => new AsrCalledRequestEvent(streamId, requestDto, tokenDto),
        // create
        RequestCreatedEvent: (streamId, requestDto, tokenDto) => new RequestCreatedEvent(streamId, requestDto, tokenDto),
        RequestCreatedSuccessEvent: (streamId, requestDto, tokenDto) => new RequestCreatedSuccessEvent(streamId, requestDto, tokenDto),
        RequestCreatedFailedEvent: (streamId, requestDto, tokenDto, error) => new RequestCreatedFailedEvent(streamId, requestDto, tokenDto, error),
        // update
        RequestTranscriptFileUrlUpdatedEvent: (streamId, id, tokenDto, url) => new RequestTranscriptFileUrlUpdatedEvent(streamId, id, tokenDto, url),
        RequestTranscriptFileUrlUpdatedSuccessEvent: (streamId, id, tokenDto, url) =>
            new RequestTranscriptFileUrlUpdatedSuccessEvent(streamId, id, tokenDto, url),
        RequestTranscriptFileUrlUpdatedFailedEvent: (streamId, id, tokenDto, url, error) =>
            new RequestTranscriptFileUrlUpdatedFailedEvent(streamId, id, tokenDto, url, error),
    };
}