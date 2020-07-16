import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetMonitorsQuery } from '../queries/impl/get-monitors.query';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MonitorsService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {
    }

    async getMonitors(getMonitorsQuery: GetMonitorsQuery) {
        const query = new GetMonitorsQuery();
        Object.assign(query, getMonitorsQuery);
        return await this.queryBus.execute(query);
    }
}