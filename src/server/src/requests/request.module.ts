import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateTokenHandler } from 'tokens/commands/handlers/update-token.handler';
import { CreateReportHandler } from 'reports/commands/handlers/create-report.handler';
import { TokenRepository } from 'tokens/repository/token.repository';
import { AuthModule } from '../auth/auth.module';
import { TokenDto } from '../tokens/dtos/tokens.dto';
import { CommandHandlers } from './commands/handler';
import { AsrController } from './controllers/requests.controller';
import { RequestDto } from './dtos/requests.dto';
import { EventHandlers } from './events/handler';
import { QueryHandlers } from './queries/handler';
import { RequestRepository } from './repository/request.repository';
import { CallAsrSagas } from './sagas/call-asr.sagas';
import { RequestService } from './services/request.service';
import { HistoriesController } from './controllers/histories.controller';
import { ReportRepository } from 'reports/repository/report.repository';
import { OrderDto } from 'orders/dtos/orders.dto';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { AsrCalledEvent } from './events/impl/asr-called.event';
import {
    RequestTranscriptFileUrlUpdatedEvent,
    RequestTranscriptFileUrlUpdatedFailedEvent,
    RequestTranscriptFileUrlUpdatedSuccessEvent
} from './events/impl/request-transcript-file-url-updated.event';
import { ClientsModule } from '@nestjs/microservices';
import { config } from '../../config';
import { kafkaClientOptions } from 'common/kafka-client.options';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { ProjectionDto } from '../core/event-store/lib/adapter/projection.dto';
import { EventStore, EventStoreModule, EventStoreSubscriptionType } from '../core/event-store/lib';

@Module({
    imports: [
        ClientsModule.register([{
            name: config.KAFKA.NAME,
            ...kafkaClientOptions,
        }]),
        TypeOrmModule.forFeature([
            RequestDto,
            TokenDto,
            TokenTypeDto,
            OrderDto,
            ProjectDto,
            ProjectionDto]),
        CqrsModule,
        EventStoreModule.registerFeature({
            featureStreamName: '$ce-request',
            subscriptions: [
                {
                    type: EventStoreSubscriptionType.CatchUp,
                    stream: '$ce-request',
                    resolveLinkTos: true, // Default is true (Optional)
                    lastCheckpoint: 13, // Default is 0 (Optional)
                },
                {
                    type: EventStoreSubscriptionType.Volatile,
                    stream: '$ce-request',
                },
                {
                    type: EventStoreSubscriptionType.Persistent,
                    stream: '$ce-request',
                    persistentSubscriptionName: 'steamName',
                    resolveLinkTos: true,  // Default is true (Optional)
                },
            ],
            eventHandlers: {
                ...RequestModule.eventHandlers,
            },
        }),
        MulterModule.register({}),
        forwardRef(() => AuthModule),
    ],
    controllers: [
        AsrController, HistoriesController,
    ],
    providers: [
        RequestService,
        CallAsrSagas,
        TokenRepository,
        RequestRepository,
        ReportRepository,
        UpdateTokenHandler,
        CreateReportHandler,
        QueryBus, EventBus,
        CommandBus, EventPublisher,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
    ],
})
export class RequestModule implements OnModuleInit {
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
        this.command$.register([...CommandHandlers, UpdateTokenHandler, CreateReportHandler]);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([CallAsrSagas]);
    }

    public static eventHandlers = {
        AsrCalledEvent: (streamId, requestDto, tokenDto) => new AsrCalledEvent(streamId, requestDto, tokenDto),
        // create
        RequestCreatedEvent: (streamId, requestDto, tokenDto) => new RequestCreatedEvent(streamId, requestDto, tokenDto),
        RequestCreatedSuccessEvent: (streamId, requestDto, tokenDto) => new RequestCreatedSuccessEvent(streamId, requestDto, tokenDto),
        RequestCreatedFailedEvent: (streamId, requestDto, tokenDto, error) => new RequestCreatedFailedEvent(streamId, requestDto, tokenDto, error),
        // update
        RequestTranscriptFileUrlUpdatedEvent: (streamId, id, url) => new RequestTranscriptFileUrlUpdatedEvent(streamId, id, url),
        RequestTranscriptFileUrlUpdatedSuccessEvent: (streamId, id, url) => new RequestTranscriptFileUrlUpdatedSuccessEvent(streamId, id, url),
        RequestTranscriptFileUrlUpdatedFailedEvent: (streamId, id, url, error) =>
        new RequestTranscriptFileUrlUpdatedFailedEvent(streamId, id, url, error),
    };
}