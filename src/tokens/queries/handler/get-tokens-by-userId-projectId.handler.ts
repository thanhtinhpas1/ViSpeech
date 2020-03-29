import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
import { GetTokensByUserIdAndProjectIdQuery } from '../impl/get-tokens-by-userId-projectId';

@QueryHandler(GetTokensByUserIdAndProjectIdQuery)
export class GetTokensByUserIdAndProjectIdHandler
    implements IQueryHandler<GetTokensByUserIdAndProjectIdQuery> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>
    ) {
    }

    async execute(query: GetTokensByUserIdAndProjectIdQuery): Promise<any> {
        Logger.log('Async GetTokensByUserIdAndProjectIdQuery...', 'GetTokensByUserIdAndProjectIdQuery');
        const { userId, projectId, offset, limit } = query;
        try {
            if (limit && offset) {
                return await this.repository.find({
                    skip: offset,
                    take: limit,
                    where: { userId, projectId }
                });
            }
            return await this.repository.find({
                where: { userId, projectId }
            });
        } catch (error) {
            Logger.error(error, '', 'GetTokensByUserIdAndProjectIdQuery');
        }
    }
}
