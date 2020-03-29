import { EventBus, IEventHandler } from '@nestjs/cqrs';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { FreeTokenCreatedEvent, FreeTokenCreatedFailedEvent, FreeTokenCreatedSuccessEvent } from '../impl/free-token-created.event';
export declare class FreeTokenCreatedHandler implements IEventHandler<FreeTokenCreatedEvent> {
    private readonly repository;
    private readonly repositoryTokenType;
    private readonly eventBus;
    constructor(repository: Repository<TokenDto>, repositoryTokenType: Repository<TokenTypeDto>, eventBus: EventBus);
    handle(event: FreeTokenCreatedEvent): Promise<void>;
}
export declare class FreeTokenCreatedSuccessHandler implements IEventHandler<FreeTokenCreatedSuccessEvent> {
    handle(event: FreeTokenCreatedSuccessEvent): void;
}
export declare class FreeTokenCreatedFailedHandler implements IEventHandler<FreeTokenCreatedFailedEvent> {
    handle(event: FreeTokenCreatedFailedEvent): void;
}
