import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestDto } from "requests/dtos/requests.dto";
import { Repository } from "typeorm";
import { FindRequestsQuery } from "../impl/find-requests.query";

@QueryHandler(FindRequestsQuery)
export class FindRequestsHandler implements IQueryHandler<FindRequestsQuery> {
    constructor(
        @InjectRepository(RequestDto)
        private readonly repository: Repository<RequestDto>,
    ) {

    }
    async execute(query: FindRequestsQuery) {
        Logger.log('Async FindRequestsHandler', 'FindRequestsQuery')
        const { limit, offset, tokenId, projectId } = query;

        try {
            const findOptions = {}
            if (limit != null && offset != null) {
                findOptions['skip'] = offset;
                findOptions['take'] = limit;
            }
            if (projectId) {
                findOptions['where'] = { projectId };
            }
            else if (tokenId) {
                findOptions['where'] = { tokenId };
            }
            else { // case admin
                findOptions['where'] = {};
            }

            const requests = await this.repository.find(findOptions);
            const count = await this.repository.count(findOptions['where']);
            return { data: requests, count };
        } catch (error) {
            Logger.error(error.message, '', 'FindRequestsQuery');
        }
    }
}