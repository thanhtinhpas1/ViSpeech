import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestDto } from "requests/dtos/requests.dto";
import { getMongoRepository, Repository } from "typeorm";
import { Utils } from "utils";
import { FindRequestsByUserIdQuery } from "../impl/find-requests-by-userId.query";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { ProjectDto } from "projects/dtos/projects.dto";

@QueryHandler(FindRequestsByUserIdQuery)
export class FindRequestsByUserIdHandler implements IQueryHandler<FindRequestsByUserIdQuery> {
    constructor(
        @InjectRepository(RequestDto)
        private readonly repository: Repository<RequestDto>,
        @InjectRepository(TokenDto)
        private readonly tokenRepository: Repository<TokenDto>,
        @InjectRepository(ProjectDto)
        private readonly projectRepository: Repository<ProjectDto>,
    ) {

    }

    async execute(query: FindRequestsByUserIdQuery) {
        Logger.log('Async FindRequestsByUserIdHandler', 'FindRequestsByUserIdQuery')
        const {limit, offset, userId, filters, sort} = query;
        let result = [];

        try {
            const findOptions = {
                where: {userId},
                order: {}
            }
            if (filters) {
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
                        const projectIds = projects.map(project => project._id)
                        findOptions.where['projectId'] = {$in: [...projectIds]}
                    }
                }
                if (filters['fileName']) {
                    findOptions.where['fileName'] = new RegExp(filters['fileName'], 'i')
                }
                if (filters['status']) {
                    findOptions.where['status'] = filters['status']
                }
            }
            if (sort) {
                const sortField = Utils.getCorrectSortField(sort.field)
                findOptions.order[sortField] = sort.order
            }

            const requests = await this.repository.find({skip: offset || 0, take: limit || 0, ...findOptions});
            for (const request of requests) {
                const token = await this.tokenRepository.findOne({_id: request.tokenId});
                const project = await this.projectRepository.findOne({_id: request.projectId});
                const projectName = project ? project.name : "";
                result.push({...request, tokenName: token.name, projectName,});
            }

            const count = await getMongoRepository(RequestDto).count(findOptions.where);
            return {data: result, count};
        } catch (error) {
            Logger.error(error.message, '', 'FindRequestsByUserIdQuery');
        }
    }
}