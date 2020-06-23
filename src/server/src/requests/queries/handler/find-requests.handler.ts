import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestDto } from "requests/dtos/requests.dto";
import { getMongoRepository, Repository } from "typeorm";
import { FindRequestsQuery } from "../impl/find-requests.query";
import { Utils } from "utils";

@QueryHandler(FindRequestsQuery)
export class FindRequestsHandler implements IQueryHandler<FindRequestsQuery> {
    constructor(
        @InjectRepository(RequestDto)
        private readonly repository: Repository<RequestDto>,
    ) {

    }

    async execute(query: FindRequestsQuery) {
        Logger.log('Async FindRequestsHandler', 'FindRequestsQuery')
        const {limit, offset, tokenId, projectId, filters, sort} = query;

        try {
            const findOptions = {
                where: {},
                order: {}
            }
            if (filters) {
                if (filters['tokenId']) {
                    findOptions.where['tokenId'] = new RegExp(filters['tokenId'], 'i')
                }
                if (filters['fileName']) {
                    findOptions.where['fileName'] = new RegExp(filters['fileName'], 'i')
                }
                if (filters['mimeType']) {
                    findOptions.where['mimeType'] = new RegExp(filters['mimeType'], 'i')
                }
                if (filters['projectId']) {
                    findOptions.where['projectId'] = new RegExp(filters['projectId'], 'i')
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
            const count = await getMongoRepository(RequestDto).count(findOptions.where);
            return {data: requests, count};
        } catch (error) {
            Logger.error(error.message, '', 'FindRequestsQuery');
        }
    }
}