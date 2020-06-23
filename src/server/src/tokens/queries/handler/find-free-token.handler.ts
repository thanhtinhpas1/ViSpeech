import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
import { FindFreeTokenQuery } from '../impl/find-free-token.query';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { CONSTANTS } from 'common/constant';

@QueryHandler(FindFreeTokenQuery)
export class FindFreeTokenHandler implements IQueryHandler<FindFreeTokenQuery> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        @InjectRepository(TokenTypeDto)
        private readonly tokenTypeRepository: Repository<TokenTypeDto>
    ) {
    }

    async execute(query: FindFreeTokenQuery): Promise<any> {
        Logger.log('Async FindFreeTokenQuery...', 'FindFreeTokenQuery');
        const {userId} = query;

        try {
            const freeToken = await this.tokenTypeRepository.findOne({name: CONSTANTS.TOKEN_TYPE.FREE})
            return await this.repository.findOne({userId, tokenTypeId: freeToken._id});
        } catch (error) {
            Logger.error(error.message, '', 'FindFreeTokenQuery');
        }
    }
}
