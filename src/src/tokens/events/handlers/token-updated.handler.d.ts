import { IEventHandler } from '@nestjs/cqrs';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
import { TokenUpdatedEvent } from '../impl/token-updated.event';
export declare class TokenUpdatedHandler implements IEventHandler<TokenUpdatedEvent> {
    private readonly repository;
    private readonly repositoryTokenType;
    constructor(repository: Repository<TokenDto>, repositoryTokenType: Repository<TokenTypeDto>);
    handle(event: TokenUpdatedEvent): Promise<import("typeorm").UpdateResult>;
}
