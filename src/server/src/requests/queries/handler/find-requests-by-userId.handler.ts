import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestDto } from "requests/dtos/requests.dto";
import { Repository, getMongoRepository } from "typeorm";
import { Utils } from "utils";
import { FindRequestsByUserIdQuery } from "../impl/find-requests-by-userId.query";

@QueryHandler(FindRequestsByUserIdQuery)
export class FindRequestsByUserIdHandler implements IQueryHandler<FindRequestsByUserIdQuery> {
    constructor(
        @InjectRepository(RequestDto)
        private readonly repository: Repository<RequestDto>,
    ) {

    }
    async execute(query: FindRequestsByUserIdQuery) {
        Logger.log('Async FindRequestsByUserIdHandler', 'FindRequestsByUserIdQuery')
        const { limit, offset, userId, filters, sort  } = query;

        try {
            const findOptions = {
                where: { userId },
                order: {}
            }
            if (filters) {
                if (filters['tokenName']) {
                    // TODO 
                }
                if (filters['projectName']) {
                    // TODO 
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

            const requests = await this.repository.find({ skip: offset || 0, take: limit || 0, ...findOptions });
            const count = await getMongoRepository(RequestDto).count(findOptions.where);
            return { data: requests, count };
        } catch (error) {
            Logger.error(error.message, '', 'FindRequestsByUserIdQuery');
        }
    }
}