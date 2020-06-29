import { forwardRef, Logger, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { getMongoRepository } from 'typeorm';
import { CommandHandlers } from './commands/handlers';
import { TokensController } from './controllers/tokens.controller';
import { TokenTypeDto } from './dtos/token-types.dto';
import { TokenDto } from './dtos/tokens.dto';
import { EventHandlers } from './events/handlers';
import {
    TokenCreatedEvent,
    TokenCreatedFailedEvent,
    TokenCreatedSuccessEvent
} from './events/impl/token-created.event';
import {
    TokenDeletedEvent,
    TokenDeletedFailedEvent,
    TokenDeletedSuccessEvent
} from './events/impl/token-deleted.event';
import {
    TokenUpdatedEvent,
    TokenUpdatedFailedEvent,
    TokenUpdatedSuccessEvent
} from './events/impl/token-updated.event';
import { TokenWelcomedEvent } from './events/impl/token-welcomed.event';
import { QueryHandlers } from './queries/handler';
import { TokenRepository } from './repository/token.repository';
import { TokensSagas } from './sagas/tokens.sagas';
import { TokensService } from './services/tokens.service';
import {
    FreeTokenCreatedEvent,
    FreeTokenCreatedFailedEvent,
    FreeTokenCreatedSuccessEvent
} from './events/impl/free-token-created.event';
import {
    OrderedTokenCreatedEvent,
    OrderedTokenCreatedFailedEvent,
    OrderedTokenCreatedSuccessEvent
} from './events/impl/ordered-token-created.event';
import { AuthModule } from '../auth/auth.module';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { config } from '../../config';
import { ClientsModule } from '@nestjs/microservices';
import { kafkaClientOptions } from 'common/kafka-client.options';
import {
    TokenDeletedByUserIdEvent,
    TokenDeletedByUserIdFailedEvent,
    TokenDeletedByUserIdSuccessEvent
} from './events/impl/token-deleted-by-userId.event';
import {
    TokenDeletedByProjectIdEvent,
    TokenDeletedByProjectIdFailedEvent,
    TokenDeletedByProjectIdSuccessEvent
} from './events/impl/token-deleted-by-projectId.event';
import { UserDto } from 'users/dtos/users.dto';
import { ProjectDto } from 'projects/dtos/projects.dto';
import {
    TokenUpgradedEvent,
    TokenUpgradedFailedEvent,
    TokenUpgradedSuccessEvent
} from './events/impl/token-upgraded.event';
import { ProjectionDto } from '../core/event-store/lib/adapter/projection.dto';
import { EventStoreSubscriptionType } from '../core/event-store/lib/contract';
import { EventStore, EventStoreModule } from '../core/event-store/lib';

@Module({
    imports: [
        ClientsModule.register([{
            name: config.KAFKA.NAME, ...kafkaClientOptions,
        }]),
        TypeOrmModule.forFeature([
            TokenDto,
            TokenTypeDto,
            PermissionDto,
            UserDto,
            ProjectDto,
            ProjectionDto
        ]),
        forwardRef(() => AuthModule),
        CqrsModule,
        EventStoreModule.registerFeature({
            featureStreamName: '$ce-token',
            subscriptions: [
                {
                    type: EventStoreSubscriptionType.CatchUp,
                    stream: '$ce-token',
                    resolveLinkTos: true, // Default is true (Optional)
                    lastCheckpoint: 13, // Default is 0 (Optional)
                },
                {
                    type: EventStoreSubscriptionType.Volatile,
                    stream: '$ce-token',
                },
                {
                    type: EventStoreSubscriptionType.Persistent,
                    stream: '$ce-token',
                    persistentSubscriptionName: 'steamName',
                    resolveLinkTos: true,  // Default is true (Optional)
                },
            ],
            eventHandlers: {
                ...TokensModule.eventHandlers,
            },
        }),
    ],
    controllers: [TokensController],
    providers: [
        TokensService,
        TokensSagas,
        TokenRepository,
        QueryBus,
        EventBus,
        CommandBus,
        EventPublisher,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
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
        this.event$.publisher = this.eventStore;
        this.event$.register(EventHandlers);
        this.command$.register(CommandHandlers);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([TokensSagas]);
        await this.persistTokenTypesToDB();
    }

    public static eventHandlers = {
        // create
        TokenCreatedEvent: (streamId, data) => new TokenCreatedEvent(streamId, data),
        TokenCreatedSuccessEvent: (streamId, data) => new TokenCreatedSuccessEvent(streamId, data),
        TokenCreatedFailedEvent: (streamId, data, error) => new TokenCreatedFailedEvent(streamId, data, error),
        // delete
        TokenDeletedEvent: (streamId, data) => new TokenDeletedEvent(streamId, data),
        TokenDeletedSuccessEvent: (streamId, data) => new TokenDeletedSuccessEvent(streamId, data),
        TokenDeletedFailedEvent: (streamId, data, error) => new TokenDeletedFailedEvent(streamId, data, error),
        // delete by userId
        TokenDeletedByUserIdEvent: (streamId, data) => new TokenDeletedByUserIdEvent(streamId, data),
        TokenDeletedByUserIdSuccessEvent: (streamId, data) => new TokenDeletedByUserIdSuccessEvent(streamId, data),
        TokenDeletedByUserIdFailedEvent: (streamId, data, error) => new TokenDeletedByUserIdFailedEvent(streamId, data, error),
        // delete by projectId
        TokenDeletedByProjectIdEvent: (streamId, data) => new TokenDeletedByProjectIdEvent(streamId, data),
        TokenDeletedByProjectIdSuccessEvent: (streamId, data) => new TokenDeletedByProjectIdSuccessEvent(streamId, data),
        TokenDeletedByProjectIdFailedEvent: (streamId, data, error) => new TokenDeletedByProjectIdFailedEvent(streamId, data, error),
        // update
        TokenUpdatedEvent: (streamId, data) => new TokenUpdatedEvent(streamId, data),
        TokenUpdatedSuccessEvent: (streamId, data) => new TokenUpdatedSuccessEvent(streamId, data),
        TokenUpdatedFailedEvent: (streamId, data, error) => new TokenUpdatedFailedEvent(streamId, data, error),
        TokenWelcomedEvent: (streamId, data) => new TokenWelcomedEvent(streamId, data),
        // free token
        FreeTokenCreatedEvent: (streamId, data) => new FreeTokenCreatedEvent(streamId, data),
        FreeTokenCreatedSuccessEvent: (streamId, data) => new FreeTokenCreatedSuccessEvent(streamId, data),
        FreeTokenCreatedFailedEvent: (streamId, data, error) => new FreeTokenCreatedFailedEvent(streamId, data, error),
        // ordered token
        OrderedTokenCreatedEvent: (streamId, data) => new OrderedTokenCreatedEvent(streamId, data),
        OrderedTokenCreatedSuccessEvent: (streamId, tokenDto, formattedToken) =>
            new OrderedTokenCreatedSuccessEvent(streamId, tokenDto, formattedToken),
        OrderedTokenCreatedFailedEvent: (streamId, data, error) => new OrderedTokenCreatedFailedEvent(streamId, data, error),
        // upgrade token
        TokenUpgradedEvent: (streamId, token, tokenType) => new TokenUpgradedEvent(streamId, token, tokenType),
        TokenUpgradedSuccessEvent: (streamId, token, tokenType) => new TokenUpgradedSuccessEvent(streamId, token, tokenType),
        TokenUpgradedFailedEvent: (streamId, token, tokenType, error) => new TokenUpgradedFailedEvent(streamId, token, tokenType, error),
    };

    async persistTokenTypesToDB() {
        try {
            const tokenTypeFree = new TokenTypeDto(CONSTANTS.TOKEN_TYPE.FREE, config.TOKEN_TYPE.TYPE_FREE_MINUTES,
                config.TOKEN_TYPE.TYPE_FREE_PRICE);
            const tokenType50 = new TokenTypeDto(CONSTANTS.TOKEN_TYPE.TYPE_50_MINUTES, config.TOKEN_TYPE.TYPE_50_MINUTES,
                config.TOKEN_TYPE.TYPE_50_PRICE);
            const tokenType200 = new TokenTypeDto(CONSTANTS.TOKEN_TYPE.TYPE_200_MINUTES, config.TOKEN_TYPE.TYPE_200_MINUTES,
                config.TOKEN_TYPE.TYPE_200_PRICE);
            const tokenType500 = new TokenTypeDto(CONSTANTS.TOKEN_TYPE.TYPE_500_MINUTES, config.TOKEN_TYPE.TYPE_500_MINUTES,
                config.TOKEN_TYPE.TYPE_500_PRICE);
            await getMongoRepository(TokenTypeDto).insert(tokenTypeFree);
            await getMongoRepository(TokenTypeDto).insert(tokenType50);
            await getMongoRepository(TokenTypeDto).insert(tokenType200);
            await getMongoRepository(TokenTypeDto).insert(tokenType500);
        } catch (e) {
            if ('duplicate key error'.includes(e.message)) {
                Logger.log('Token types existed.');
            }
            Logger.warn('Something went wrong when seed token types.');
        }
    }
}
