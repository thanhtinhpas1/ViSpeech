import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestDto } from "requests/dtos/requests.dto";
import { getMongoRepository, Repository } from "typeorm";
import { FindRequestsQuery } from "../impl/find-requests.query";
import { Utils } from "utils";
import { ProjectDto } from "projects/dtos/projects.dto";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { UserDto } from "users/dtos/users.dto";
import { TokenTypeDto } from "tokens/dtos/token-types.dto";

@QueryHandler(FindRequestsQuery)
export class FindRequestsHandler implements IQueryHandler<FindRequestsQuery> {
    constructor(
        @InjectRepository(RequestDto)
        private readonly repository: Repository<RequestDto>,
        @InjectRepository(UserDto)
        private readonly userRepository: Repository<UserDto>,
        @InjectRepository(TokenDto)
        private readonly tokenRepository: Repository<TokenDto>,
        @InjectRepository(TokenTypeDto)
        private readonly tokenTypeRepository: Repository<TokenTypeDto>,
        @InjectRepository(ProjectDto)
        private readonly projectRepository: Repository<ProjectDto>
    ) {

    }

    async execute(query: FindRequestsQuery) {
        Logger.log('Async FindRequestsHandler', 'FindRequestsQuery')
        const {limit, offset, tokenId, projectId, filters, sort, advancedFilters} = query;
        const result = [];
        try {
            const findOptions = {
                where: {},
                order: {}
            }
            console.log(`ADVANCED ${JSON.stringify(advancedFilters)}`)
            console.log(`FILTER ${JSON.stringify(filters)}`)
            if (advancedFilters) {
                if (advancedFilters['userIds']) {
                    findOptions.where['userId'] = {$in: [...advancedFilters['userIds']]}
                }
                if (advancedFilters['projectIds']) {
                    findOptions.where['projectId'] = {$in: [...advancedFilters['projectIds']]}
                }
                if (advancedFilters['tokenTypes']) {
                    const tokenTypes = await this.tokenTypeRepository.find({where: {name: {$in: [...advancedFilters['tokenTypes']]}}});
                    if (tokenTypes.length > 0) {
                        const tokenTypeIds = tokenTypes.map(type => type._id)
                        findOptions.where['tokenTypeId'] = {$in: tokenTypeIds}
                    }
                }
                if (advancedFilters['statuses']) {
                    findOptions.where['status'] = {$in: [...advancedFilters['statuses']]}
                }
                if (advancedFilters['dates']) {
                    findOptions.where['createdDate'] = {
                        $gte: new Date(Number(advancedFilters['dates'].from)),
                        $lt: new Date(Number(advancedFilters['dates'].to)),
                    }
                }
            }
            if (filters) {
                if (filters['fileName']) {
                    findOptions.where['fileName'] = new RegExp(filters['fileName'], 'i')
                }
                if (filters['mimeType']) {
                    findOptions.where['mimeType'] = new RegExp(filters['mimeType'], 'i')
                }
                if (filters['status']) {
                    if (advancedFilters && advancedFilters['statuses']) {
                        const value = advancedFilters['statuses'].includes(filters['status']) ? filters['status'] : ''
                        findOptions.where['status'] = value
                    } else {
                        findOptions.where['status'] = filters['status']
                    }
                }
                if (filters['tokenType']) {
                    if (advancedFilters && advancedFilters['tokenTypes']) {
                        const tokenType = advancedFilters['tokenTypes'].includes(filters['tokenType']) ?
                            await this.tokenTypeRepository.findOne({where: {name: filters['tokenType']}}) : { _id: '' };
                        findOptions.where['tokenTypeId'] = tokenType?._id
                    } else {
                        const tokenType = await this.tokenTypeRepository.findOne({where: {name: filters['tokenType']}});
                        findOptions.where['tokenTypeId'] = tokenType?._id
                    }
                }
                if (filters['tokenName']) {
                    const tokens = await this.tokenRepository.find({where: {name: new RegExp(filters['tokenName'], 'i')}});
                    if (tokens.length > 0) {
                        const tokenIds = tokens.map(token => token._id)
                        findOptions.where['tokenId'] = {$in: [...tokenIds]}
                    }
                }
                if (filters['projectName']) {
                    const projects = await this.projectRepository.find({where: {name: new RegExp(filters['projectName'], 'i')}});
                    if (projects.length > 0) {
                        let projectIds = projects.map(project => project._id);
                        if (advancedFilters && advancedFilters['projectIds']) {
                            projectIds = projectIds.filter(id => advancedFilters['projectIds'].includes(id));
                        }
                        findOptions.where['projectId'] = {$in: [...projectIds]}
                    }
                }
                if (filters['username']) {
                    const users = await this.userRepository.find({where: {username: new RegExp(filters['username'], 'i')}});
                    if (users.length > 0) {
                        let userIds = users.map(user => user._id);
                        if (advancedFilters && advancedFilters['userIds']) {
                            userIds = userIds.filter(id => advancedFilters['userIds'].includes(id));
                        }
                        findOptions.where['userId'] = {$in: [...userIds]}
                    }
                }
            }
            if (sort) {
                const sortField = Utils.getCorrectSortField(sort.field)
                findOptions.order[sortField] = sort.order
            }
            if (projectId) {
                findOptions.where['projectId'] = projectId;
            }
            if (tokenId) {
                findOptions.where['tokenId'] = tokenId;
            }

            const requests = await this.repository.find({skip: offset || 0, take: limit || 0, ...findOptions});
            for (const request of requests) {
                const user = await this.userRepository.findOne({_id: request.userId});
                const token = await this.tokenRepository.findOne({_id: request.tokenId});
                const tokenType = await this.tokenTypeRepository.findOne({_id: request.tokenTypeId});
                const project = request.projectId !== '' ? await this.projectRepository.findOne({_id: request.projectId}) : null;
                const projectName = project ? project.name : '';
                result.push({...request, username: user.username, tokenName: token.name, tokenTypeName: tokenType.name, projectName});
            }

            const count = await getMongoRepository(RequestDto).count(findOptions.where);
            return {data: result, count};
        } catch (error) {
            Logger.error(error.message, '', 'FindRequestsQuery');
        }
    }
}