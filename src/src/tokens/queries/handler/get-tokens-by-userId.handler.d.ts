import { IQueryHandler } from '@nestjs/cqrs';
import { GetTokensByUserIdQuery } from '../impl/get-tokens-by-userId';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
export declare class GetTokensByUserIdHandler implements IQueryHandler<GetTokensByUserIdQuery> {
    private readonly repository;
    constructor(repository: Repository<TokenDto>);
    execute(query: GetTokensByUserIdQuery): Promise<any>;
}
