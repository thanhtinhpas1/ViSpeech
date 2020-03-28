import {forwardRef, Module, OnModuleInit} from '@nestjs/common';
import {CommandBus, EventBus, EventPublisher, QueryBus} from '@nestjs/cqrs';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CONSTANTS} from 'common/constant';
import {EventStore} from 'core/event-store/event-store';
import {EventStoreModule} from 'core/event-store/event-store.module';
import {getMongoRepository} from 'typeorm';
import {CommandHandlers} from './commands/handlers';
import {TokensController} from './controllers/tokens.controller';
import {TokenTypeDto} from './dtos/token-types.dto';
import {TokenDto} from './dtos/tokens.dto';
import {EventHandlers} from './events/handlers';
import {TokenCreatedEvent, TokenCreatedFailedEvent, TokenCreatedSuccessEvent} from './events/impl/token-created.event';
import {TokenDeletedByUserIdEvent, TokenDeletedEvent} from './events/impl/token-deleted.event';
import {TokenUpdatedEvent} from './events/impl/token-updated.event';
import {TokenWelcomedEvent} from './events/impl/token-welcomed.event';
import {QueryHandlers} from './queries/handler';
import {TokenRepository} from './repository/token.repository';
import {TokensSagas} from './sagas/tokens.sagas';
import {TokensService} from './services/tokens.service';
import {FreeTokenCreatedEvent, FreeTokenCreatedFailedEvent, FreeTokenCreatedSuccessEvent} from './events/impl/free-token-created.event';
import {OrderedTokenCreatedEvent, OrderedTokenCreatedFailedEvent, OrderedTokenCreatedSuccessEvent} from './events/impl/ordered-token-created.event';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TokenDto, TokenTypeDto]),
        forwardRef(() => AuthModule),
        EventStoreModule.forFeature(),
    ],
    controllers: [TokensController],
    providers: [
        TokensService,
        TokensSagas,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        TokenRepository,
        QueryBus, EventBus, EventStore, CommandBus, EventPublisher,
    ],
    exports: [TokensService],
})
export class TokensModule implements OnModuleInit {
    constructor(
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus,
        private readonly eventStore: EventStore,
    ) {
    }

    async onModuleInit() {
        this.eventStore.setEventHandlers(TokensModule.eventHandlers);
        await this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
        this.event$.publisher = this.eventStore;
        /** ------------ */
        this.event$.register(EventHandlers);
        this.command$.register(CommandHandlers);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([TokensSagas]);

        this.persistTokenTypesToDB();
    }

    public static eventHandlers = {
        // create
        TokenCreatedEvent: (streamId, data) => new TokenCreatedEvent(streamId, data),
        TokenCreatedSuccessEvent: (streamId, data) => new TokenCreatedSuccessEvent(streamId, data),
        TokenCreatedFailedEvent: (streamId, data, error) => new TokenCreatedFailedEvent(streamId, data, error),

        TokenDeletedEvent: (streamId, data) => new TokenDeletedEvent(streamId, data),
        TokenDeletedByUserIdEvent: (streamId, data) => new TokenDeletedByUserIdEvent(streamId, data),
        TokenUpdatedEvent: (streamId, data) => new TokenUpdatedEvent(streamId, data),
        TokenWelcomedEvent: (streamId, data) => new TokenWelcomedEvent(streamId, data),

        // free token
        FreeTokenCreatedEvent: (streamId, data) => new FreeTokenCreatedEvent(streamId, data),
        FreeTokenCreatedSuccessEvent: (streamId, data) => new FreeTokenCreatedSuccessEvent(streamId, data),
        FreeTokenCreatedFailedEvent: (streamId, data, error) => new FreeTokenCreatedFailedEvent(streamId, data, error),

        // ordered token
        OrderedTokenCreatedEvent: (streamId, data) => new OrderedTokenCreatedEvent(streamId, data),
        OrderedTokenCreatedSuccessEvent: (streamId, data) => new OrderedTokenCreatedSuccessEvent(streamId, data),
        OrderedTokenCreatedFailedEvent: (streamId, data, error) => new OrderedTokenCreatedFailedEvent(streamId, data, error),
    };

    async persistTokenTypesToDB() {
        const freeTokenType = await getMongoRepository(TokenTypeDto).find({
            name: CONSTANTS.TOKEN_TYPE.FREE,
        });
        const tokenType_50 = await getMongoRepository(TokenTypeDto).find({
            name: CONSTANTS.TOKEN_TYPE['50-MINS'],
        });
        const tokenType_200 = await getMongoRepository(TokenTypeDto).find({
            name: CONSTANTS.TOKEN_TYPE['200-MINS'],
        });
        const tokenType_500 = await getMongoRepository(TokenTypeDto).find({
            name: CONSTANTS.TOKEN_TYPE['500-MINS'],
        });
        if (!freeTokenType[0] && !tokenType_50[0] && !tokenType_200[0] && !tokenType_500[0]) {
            getMongoRepository(TokenTypeDto).save(new TokenTypeDto(CONSTANTS.TOKEN_TYPE.FREE, 10, 0));
            getMongoRepository(TokenTypeDto).save(new TokenTypeDto(CONSTANTS.TOKEN_TYPE['50-MINS'], 50, 5));
            getMongoRepository(TokenTypeDto).save(new TokenTypeDto(CONSTANTS.TOKEN_TYPE['200-MINS'], 200, 10));
            getMongoRepository(TokenTypeDto).save(new TokenTypeDto(CONSTANTS.TOKEN_TYPE['500-MINS'], 500, 20));
        }
    }
}
