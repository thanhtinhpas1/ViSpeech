import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { FindRequestQuery } from '../impl/find-request.query';
import { RequestDto } from 'requests/dtos/requests.dto';

@QueryHandler(FindRequestQuery)
export class FindRequestHandler implements IQueryHandler<FindRequestQuery> {
    constructor(
        @InjectRepository(RequestDto)
        private readonly repository: Repository<RequestDto>
    ) {
    }

    async execute(query: FindRequestQuery): Promise<any> {
        Logger.log('Async FindRequestQuery...', 'FindRequestQuery');
        try {
            return await this.repository.findOne({ _id: query.id });
        } catch (error) {
            Logger.error(error, '', 'FindRequestQuery');
        }
    }
}
