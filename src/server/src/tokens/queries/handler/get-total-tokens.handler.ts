import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { GetTotalTokensQuery } from 'tokens/queries/impl/get-total-tokens.query';
import { getMongoRepository } from 'typeorm';

@QueryHandler(GetTotalTokensQuery)
export class GetTotalTokensHandler implements IQueryHandler<GetTotalTokensQuery> {
    public execute(query: GetTotalTokensQuery): Promise<any> {
        return getMongoRepository(TokenDto).count({})
            .then(count => {
                return { data: [], count };
            });
    }
}