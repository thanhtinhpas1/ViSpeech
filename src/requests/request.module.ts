import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { AsrController } from './controllers/requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from '../auth/auth.module';
import { CommandBus, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { EventStore } from '../core/event-store/event-store';
import { EventHandlers } from './events/handler';
import { CommandHandlers } from './commands/handler';
import { QueryHandlers } from './queries/handler';
import { RequestDto } from './dtos/requests.dto';
import { EventStoreModule } from '../core/event-store/event-store.module';
import { TokenDto } from '../tokens/dtos/tokens.dto';
import { AuthService } from 'auth/auth.service';
import { TokenRepository } from 'tokens/repository/token.repository';
import { RequestService } from './services/request.service';
import { CallAsrEvent } from './events/impl/call-asr.event';
import { CallAsrSagas } from './sagas/call-asr.sagas';
import { RequestRepository } from './repository/request.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([RequestDto, TokenDto]),
        EventStoreModule.forFeature(),
        MulterModule.register({}),
        forwardRef(() => AuthModule),
    ],
    controllers: [
        AsrController,
    ],
    providers: [
        QueryBus, EventBus, EventStore, CommandBus, EventPublisher,
        AuthService, TokenRepository, RequestService,
        RequestRepository, ...CommandHandlers,
        CallAsrSagas,
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
        this.command$.register(CommandHandlers);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([CallAsrSagas]);
    }

    eventHandlers = {
        CallAsrEvent: (streamId, requestDto, tokenDto) => new CallAsrEvent(streamId, requestDto, tokenDto),
    };
}