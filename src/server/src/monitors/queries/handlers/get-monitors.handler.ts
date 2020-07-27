import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMonitorsQuery } from '../impl/get-monitors.query';
import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MonitorDto } from '../../dtos/monitor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Utils } from '../../../utils';

@QueryHandler(GetMonitorsQuery)
export class GetMonitorsHandler implements IQueryHandler<GetMonitorsQuery> {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @InjectRepository(MonitorDto)
        private readonly repository: Repository<MonitorDto>,
    ) {
    }

    async execute(query: GetMonitorsQuery) {
        Logger.log('Async GetMonitorsHandler...', 'GetMonitorsQuery');
        const { offset, limit, sort } = query;
        let snapshots = [];
        try {
            const findOptions = {
                where: {},
                order: {}
            };
            if (sort) {
                const sortField = Utils.getCorrectSortField(sort.field);
                findOptions.order[`data.${sortField}`] = sort.order;
            }
            snapshots = await this.repository.find({ skip: offset || 0, take: limit || 0, ...findOptions });
            const count = await this.repository.count(findOptions.where);
            return { data: snapshots, count };
        } catch (error) {
            this.logger.error(error);
        }
    }
}
