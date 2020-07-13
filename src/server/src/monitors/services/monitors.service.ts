import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetOrdersQuery } from '../../orders/queries/impl/get-orders.query';
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
        const query = new GetOrdersQuery();
        Object.assign(query, getMonitorsQuery);
        return await this.queryBus.execute(query);
    }
}