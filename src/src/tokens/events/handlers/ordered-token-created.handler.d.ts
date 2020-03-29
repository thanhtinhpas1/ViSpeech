import { EventBus, IEventHandler } from '@nestjs/cqrs';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { OrderedTokenCreatedEvent, OrderedTokenCreatedFailedEvent, OrderedTokenCreatedSuccessEvent } from '../impl/ordered-token-created.event';
export declare class OrderedTokenCreatedHandler implements IEventHandler<OrderedTokenCreatedEvent> {
    private readonly repository;
    private readonly repositoryTokenType;
    private readonly eventBus;
    constructor(repository: Repository<TokenDto>, repositoryTokenType: Repository<TokenTypeDto>, eventBus: EventBus);
    handle(event: OrderedTokenCreatedEvent): Promise<void>;
}
export declare class OrderedTokenCreatedSuccessHandler implements IEventHandler<OrderedTokenCreatedSuccessEvent> {
    handle(event: OrderedTokenCreatedSuccessEvent): void;
}
export declare class OrderedTokenCreatedFailedHandler implements IEventHandler<OrderedTokenCreatedFailedEvent> {
    handle(event: OrderedTokenCreatedFailedEvent): void;
}
