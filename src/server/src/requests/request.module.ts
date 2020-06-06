import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateTokenHandler } from 'tokens/commands/handlers/update-token.handler';
import { CreateReportHandler } from 'reports/commands/handlers/create-report.handler';
import { TokenRepository } from 'tokens/repository/token.repository';
import { AuthModule } from '../auth/auth.module';
import { EventStore } from '../core/event-store/event-store';
import { EventStoreModule } from '../core/event-store/event-store.module';
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
import { RequestTranscriptFileUrlUpdatedEvent, RequestTranscriptFileUrlUpdatedFailedEvent, RequestTranscriptFileUrlUpdatedSuccessEvent } from './events/impl/request-transcript-file-url-updated.event';
import { ClientsModule } from '@nestjs/microservices';
import { config } from "../../config";
import { kafkaClientOptions } from "common/kafka-client.options";

@Module({
    imports: [
        ClientsModule.register([{
            name: config.KAFKA.NAME,
            ...kafkaClientOptions,
        }]),
        TypeOrmModule.forFeature([RequestDto, TokenDto, OrderDto, ProjectDto]),
        EventStoreModule.forFeature(),
        MulterModule.register({}),
        forwardRef(() => AuthModule),
    ],
    controllers: [
        AsrController, HistoriesController,
    ],
    providers: [
        RequestService,
        CallAsrSagas,
        ...CommandHandlers, ...EventHandlers, ...QueryHandlers,
        TokenRepository,
        RequestRepository,
        ReportRepository,
        UpdateTokenHandler,
        CreateReportHandler,
        QueryBus, EventBus, EventStore, CommandBus, EventPublisher,
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

    onModuleInit(): any {
        this.eventStore.setEventHandlers(this.eventHandlers);
        this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
        this.event$.publisher = this.eventStore;
        /** ------------ */
        this.event$.register(EventHandlers);
        this.command$.register([...CommandHandlers, UpdateTokenHandler, CreateReportHandler]);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([CallAsrSagas]);
    }

    eventHandlers = {
        AsrCalledEvent: (streamId, requestDto, tokenDto) => new AsrCalledEvent(streamId, requestDto, tokenDto),
        // update
        RequestTranscriptFileUrlUpdatedEvent: (streamId, id, url) => new RequestTranscriptFileUrlUpdatedEvent(streamId, id, url),
        RequestTranscriptFileUrlUpdatedSuccessEvent: (streamId, id, url) => new RequestTranscriptFileUrlUpdatedSuccessEvent(streamId, id, url),
        RequestTranscriptFileUrlUpdatedFailedEvent: (streamId, id, url, error) => new RequestTranscriptFileUrlUpdatedFailedEvent(streamId, id, url, error),
    };
}