import { EventBus, IEventHandler } from '@nestjs/cqrs';
import { TokenCreatedEvent, TokenCreatedFailedEvent, TokenCreatedSuccessEvent } from '../impl/token-created.event';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
export declare class TokenCreatedHandler implements IEventHandler<TokenCreatedEvent> {
    private readonly repository;
    private readonly repositoryTokenType;
    private readonly eventBus;
    constructor(repository: Repository<TokenDto>, repositoryTokenType: Repository<TokenTypeDto>, eventBus: EventBus);
    handle(event: TokenCreatedEvent): Promise<void>;
}
export declare class TokenCreatedSuccessHandler implements IEventHandler<TokenCreatedSuccessEvent> {
    handle(event: TokenCreatedSuccessEvent): void;
}
export declare class TokenCreatedFailedHandler implements IEventHandler<TokenCreatedFailedEvent> {
    handle(event: TokenCreatedFailedEvent): void;
}
