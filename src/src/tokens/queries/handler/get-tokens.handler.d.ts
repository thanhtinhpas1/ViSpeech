import { GetTokensQuery, GetTokenTypesQuery } from '../impl/get-tokens.query';
import { IQueryHandler } from '@nestjs/cqrs';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
export declare class GetTokensHandler implements IQueryHandler<GetTokensQuery> {
    private readonly repository;
    constructor(repository: Repository<TokenDto>);
    execute(query: GetTokensQuery): Promise<TokenDto[]>;
}
export declare class GetTokenTypesHandler implements IQueryHandler<GetTokenTypesQuery> {
    private readonly tokenTypeRepository;
    constructor(tokenTypeRepository: Repository<TokenTypeDto>);
    execute(query: GetTokenTypesQuery): Promise<TokenTypeDto[]>;
}
