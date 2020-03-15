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
import {TokenCreatedEvent, TokenCreatedFailEvent, TokenCreatedSuccessEvent} from './events/impl/token-created.event';
import {TokenDeletedEvent} from './events/impl/token-deleted.event';
import {TokenUpdatedEvent} from './events/impl/token-updated.event';
import {TokenWelcomedEvent} from './events/impl/token-welcomed.event';
import {QueryHandlers} from './queries/handler';
import {TokenRepository} from './repository/token.repository';
import {TokensSagas} from './sagas/tokens.sagas';
import {TokensService} from './services/tokens.service';
import {FreeTokenCreatedEvent, FreeTokenCreatedFailEvent, FreeTokenCreatedSuccessEvent} from './events/impl/free-token-created.event';
import {OrderedTokenCreatedEvent, OrderedTokenCreatedFailEvent, OrderedTokenCreatedSuccessEvent} from './events/impl/ordered-token-created';
import {AuthService} from 'auth/auth.service';
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
        AuthService,
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
        TokenCreatedEvent: (transactionId, data) => new TokenCreatedEvent(transactionId, data),
        TokenCreatedSuccessEvent: (transactionId, data) => new TokenCreatedSuccessEvent(transactionId, data),
        TokenCreatedFailEvent: (transactionId, data, error) => new TokenCreatedFailEvent(transactionId, data, error),
        TokenDeletedEvent: (transactionId, data) => new TokenDeletedEvent(transactionId, data),
        TokenUpdatedEvent: data => new TokenUpdatedEvent(data),
        TokenWelcomedEvent: data => new TokenWelcomedEvent(data),
        // free token
        FreeTokenCreatedEvent: (transactionId, data) => new FreeTokenCreatedEvent(transactionId, data),
        FreeTokenCreatedSuccessEvent: (transactionId, data) => new FreeTokenCreatedSuccessEvent(transactionId, data),
        FreeTokenCreatedFailEvent: (transactionId, error) => new FreeTokenCreatedFailEvent(transactionId, error),
        // ordered token
        OrderedTokenCreatedEvent: (transactionId, data) => new OrderedTokenCreatedEvent(transactionId, data),
        OrderedTokenCreatedSuccessEvent: (transactionId, data) => new OrderedTokenCreatedSuccessEvent(transactionId, data),
        OrderedTokenCreatedFailEvent: (transactionId, data, error) => new OrderedTokenCreatedFailEvent(transactionId, data, error),
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
