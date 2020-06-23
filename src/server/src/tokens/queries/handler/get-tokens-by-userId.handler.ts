import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTokensByUserIdQuery } from '../impl/get-tokens-by-userId';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';

@QueryHandler(GetTokensByUserIdQuery)
export class GetTokensByUserIdHandler
    implements IQueryHandler<GetTokensByUserIdQuery> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>
    ) {
    }

    async execute(query: GetTokensByUserIdQuery): Promise<any> {
        Logger.log('Async GetTokensByUserIdQuery...', 'GetTokensByUserIdQuery');
        const {userId, offset, limit} = query;
        let tokens = [];
        try {
            const findOptions = {where: {userId}}
            tokens = limit != null && offset != null ?
                await this.repository.find({skip: offset, take: limit, ...findOptions}) :
                await this.repository.find(findOptions);
            const count = await this.repository.count(findOptions.where);
            return {data: tokens, count};
        } catch (error) {
            Logger.error(error, '', 'GetTokensByUserIdQuery');
        }
    }
}
