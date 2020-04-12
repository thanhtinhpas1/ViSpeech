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
        private readonly requestRepository: Repository<RequestDto>,
    ) {

    }
    async execute(query: FindRequestsQuery) {
        Logger.log('Async FindRequestsHandler', 'FindRequestsQuery')
        const { limit, offset, tokenId, projectId } = query;
        if (limit != null && offset != null) {
            if (projectId) {
                return await this.requestRepository.find({
                    skip: offset,
                    take: limit,
                    where: {
                        projectId,
                    },
                })
            }
            else if (tokenId) {
                return await this.requestRepository.find({
                    skip: offset,
                    take: limit,
                    where: {
                        tokenId,
                    },

                })
            }
            else { // case admin
                return await this.requestRepository.find({
                    skip: offset,
                    take: limit,
                })
            }
        }
        if (projectId) {
            return await this.requestRepository.find({
                where: {
                    projectId,
                },
            })
        }
        else if (tokenId) {
            return await this.requestRepository.find({
                where: {
                    tokenId,
                },
            })
        }
        else { // case admin role
            return await this.requestRepository.find();
        }
    }
}