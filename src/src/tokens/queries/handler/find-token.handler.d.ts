import { IQueryHandler } from '@nestjs/cqrs';
import { FindTokenQuery } from '../impl/find-token.query';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
export declare class FindTokenHandler implements IQueryHandler<FindTokenQuery> {
    private readonly repository;
    constructor(repository: Repository<TokenDto>);
    execute(query: FindTokenQuery): Promise<any>;
}
