import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {GetTokensByUserIdQuery} from '../impl/get-tokens-by-userId';
import {Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TokenDto} from 'tokens/dtos/tokens.dto';
import {Repository} from 'typeorm';

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
        try {
            if (limit && offset) {
                return await this.repository.find({
                    skip: offset,
                    take: limit,
                    where: {userId}
                });
            }
            return await this.repository.find({
                where: {userId}
            });
        } catch (error) {
            Logger.error(error, '', 'GetTokensByUserIdQuery');
        }
    }
}
