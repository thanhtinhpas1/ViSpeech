import {GetTokensQuery, GetTokenTypesQuery} from '../impl/get-tokens.query';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TokenDto} from 'tokens/dtos/tokens.dto';
import {Repository} from 'typeorm';
import {TokenTypeDto} from 'tokens/dtos/token-types.dto';

@QueryHandler(GetTokensQuery)
export class GetTokensHandler implements IQueryHandler<GetTokensQuery> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>
    ) {
    }

    async execute(query: GetTokensQuery) {
        Logger.log('Async GetTokensHandler...', 'GetTokensQuery');
        const {offset, limit} = query;
        try {
            if (limit && offset) {
                return await this.repository.find({
                    skip: offset,
                    take: limit
                });
            }
            return await this.repository.find();
        } catch (error) {
            Logger.error(error, '', 'GetTokensQuery');
        }
    }
}

@QueryHandler(GetTokenTypesQuery)
export class GetTokenTypesHandler implements IQueryHandler<GetTokenTypesQuery> {
    constructor(
        @InjectRepository(TokenTypeDto)
        private readonly tokenTypeRepository: Repository<TokenTypeDto>
    ) {
    }

    async execute(query: GetTokenTypesQuery) {
        Logger.log('Async GetTokenTypesHandler...', 'GetTokenTypesQuery');

        try {
            return await this.tokenTypeRepository.find();
        } catch (error) {
            Logger.error(error, '', 'GetTokenTypesQuery');
        }
    }
}
