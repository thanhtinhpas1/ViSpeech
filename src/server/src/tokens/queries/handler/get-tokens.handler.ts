import { GetTokensQuery, GetTokenTypesQuery } from '../impl/get-tokens.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { getMongoRepository, Repository } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { Utils } from 'utils';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { UserDto } from 'users/dtos/users.dto';

@QueryHandler(GetTokensQuery)
export class GetTokensHandler implements IQueryHandler<GetTokensQuery> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        @InjectRepository(TokenTypeDto)
        private readonly tokenTypeDtoRepository: Repository<TokenTypeDto>,
        @InjectRepository(ProjectDto)
        private readonly projectDtoRepository: Repository<ProjectDto>,
        @InjectRepository(UserDto)
        private readonly userDtoRepository: Repository<UserDto>
    ) {
    }

    async execute(query: GetTokensQuery) {
        Logger.log('Async GetTokensHandler...', 'GetTokensQuery');
        const {offset, limit, filters, sort} = query;
        let tokens = [];
        let result = [];
        try {
            const findOptions = {
                where: {},
                order: {}
            }
            if (filters) {
                if (filters['_id']) {
                    findOptions.where['_id'] = new RegExp(filters['_id'], 'i')
                }
                if (filters['tokenType']) {
                    const tokenTypes = await this.tokenTypeDtoRepository.find({name: filters['tokenType']})
                    const tokenTypeIds = tokenTypes.map(tokenType => tokenType._id)
                    findOptions.where['tokenTypeId'] = {$in: [...tokenTypeIds]}
                }
                if (filters['isValid']) {
                    findOptions.where['isValid'] = Utils.convertToBoolean(filters['isValid'])
                }
                if (filters['ownerName']) {
                    const users = await this.userDtoRepository.find({where: {username: new RegExp(filters['ownerName'], 'i')}});
                    if (users.length > 0) {
                        const userIds = users.map(user => user._id)
                        findOptions.where['userId'] = {$in: [...userIds]}
                    }
                }
                if (filters['projectName']) {
                    const projects = await this.projectDtoRepository.find({where: {name: new RegExp(filters['projectName'], 'i')}});
                    if (projects.length > 0) {
                        const projectIds = projects.map(project => project._id)
                        findOptions.where['projectId'] = {$in: [...projectIds]}
                    }
                }
            }
            if (sort) {
                const sortField = Utils.getCorrectSortField(sort.field)
                findOptions.order[sortField] = sort.order
            }

            tokens = await this.repository.find({skip: offset || 0, take: limit || 0, ...findOptions});
            for (const token of tokens) {
                const user = await this.userDtoRepository.findOne({_id: token.userId.toString()});
                const project = await this.projectDtoRepository.findOne({_id: token.projectId.toString()});
                const projectName = project ? project.name : '';
                result.push({...token, ownerName: user?.username, projectName});
            }

            const count = await getMongoRepository(TokenDto).count(findOptions.where);
            return {data: result, count};
        } catch (error) {
            Logger.error(error.message, '', 'GetTokensQuery');
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
