import { IEventHandler } from '@nestjs/cqrs';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { TokenDeletedByUserIdEvent, TokenDeletedEvent } from '../impl/token-deleted.event';
import { Repository } from 'typeorm';
export declare class TokenDeletedHandler implements IEventHandler<TokenDeletedEvent> {
    private readonly repository;
    constructor(repository: Repository<TokenDto>);
    handle(event: TokenDeletedEvent): Promise<void>;
}
export declare class TokenDeletedByUserIdHandler implements IEventHandler<TokenDeletedByUserIdEvent> {
    private readonly repository;
    constructor(repository: Repository<TokenDto>);
    handle(event: TokenDeletedByUserIdEvent): Promise<void>;
}
