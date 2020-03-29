import { OnModuleInit } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { EventStore } from 'core/event-store/event-store';
import { TokenCreatedEvent, TokenCreatedFailedEvent, TokenCreatedSuccessEvent } from './events/impl/token-created.event';
import { TokenDeletedByUserIdEvent, TokenDeletedEvent } from './events/impl/token-deleted.event';
import { TokenUpdatedEvent } from './events/impl/token-updated.event';
import { TokenWelcomedEvent } from './events/impl/token-welcomed.event';
import { FreeTokenCreatedEvent, FreeTokenCreatedFailedEvent, FreeTokenCreatedSuccessEvent } from './events/impl/free-token-created.event';
import { OrderedTokenCreatedEvent, OrderedTokenCreatedFailedEvent, OrderedTokenCreatedSuccessEvent } from './events/impl/ordered-token-created.event';
export declare class TokensModule implements OnModuleInit {
    private readonly command$;
    private readonly query$;
    private readonly event$;
    private readonly eventStore;
    constructor(command$: CommandBus, query$: QueryBus, event$: EventBus, eventStore: EventStore);
    onModuleInit(): Promise<void>;
    static eventHandlers: {
        TokenCreatedEvent: (streamId: any, data: any) => TokenCreatedEvent;
        TokenCreatedSuccessEvent: (streamId: any, data: any) => TokenCreatedSuccessEvent;
        TokenCreatedFailedEvent: (streamId: any, data: any, error: any) => TokenCreatedFailedEvent;
        TokenDeletedEvent: (streamId: any, data: any) => TokenDeletedEvent;
        TokenDeletedByUserIdEvent: (streamId: any, data: any) => TokenDeletedByUserIdEvent;
        TokenUpdatedEvent: (streamId: any, data: any) => TokenUpdatedEvent;
        TokenWelcomedEvent: (streamId: any, data: any) => TokenWelcomedEvent;
        FreeTokenCreatedEvent: (streamId: any, data: any) => FreeTokenCreatedEvent;
        FreeTokenCreatedSuccessEvent: (streamId: any, data: any) => FreeTokenCreatedSuccessEvent;
        FreeTokenCreatedFailedEvent: (streamId: any, data: any, error: any) => FreeTokenCreatedFailedEvent;
        OrderedTokenCreatedEvent: (streamId: any, data: any) => OrderedTokenCreatedEvent;
        OrderedTokenCreatedSuccessEvent: (streamId: any, data: any) => OrderedTokenCreatedSuccessEvent;
        OrderedTokenCreatedFailedEvent: (streamId: any, data: any, error: any) => OrderedTokenCreatedFailedEvent;
    };
    persistTokenTypesToDB(): Promise<void>;
}
