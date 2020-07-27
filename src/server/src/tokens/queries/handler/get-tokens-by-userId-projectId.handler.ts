import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { getMongoRepository, Repository } from 'typeorm';
import { GetTokensByUserIdAndProjectIdQuery } from '../impl/get-tokens-by-userId-projectId';
import { Utils } from 'utils';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';

@QueryHandler(GetTokensByUserIdAndProjectIdQuery)
export class GetTokensByUserIdAndProjectIdHandler
    implements IQueryHandler<GetTokensByUserIdAndProjectIdQuery> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        @InjectRepository(TokenTypeDto)
        private readonly tokenTypeDtoRepository: Repository<TokenTypeDto>
    ) {
    }

    async execute(query: GetTokensByUserIdAndProjectIdQuery): Promise<any> {
        Logger.log('Async GetTokensByUserIdAndProjectIdQuery...', 'GetTokensByUserIdAndProjectIdQuery');
        const { userId, projectId, offset, limit, filters, sort } = query;
        let tokens = [];
        try {
            const findOptions = {
                where: { userId, projectId },
                order: {}
            };
            if (filters) {
                if (filters['tokenType']) {
                    const tokenTypes = await this.tokenTypeDtoRepository.find({ name: filters['tokenType'] });
                    const tokenTypeIds = tokenTypes.map(tokenType => tokenType._id);
                    findOptions.where['tokenTypeId'] = { $in: [...tokenTypeIds] };
                }
                if (filters['isValid']) {
                    findOptions.where['isValid'] = Utils.convertToBoolean(filters['isValid']);
                }
            }
            if (sort) {
                const sortField = Utils.getCorrectSortField(sort.field);
                findOptions.order[sortField] = sort.order;
            }

            tokens = await this.repository.find({ skip: offset || 0, take: limit || 0, ...findOptions });
            const count = await getMongoRepository(TokenDto).count(findOptions.where);
            return { data: tokens, count };
        } catch (error) {
            Logger.error(error, '', 'GetTokensByUserIdAndProjectIdQuery');
        }
    }
}
