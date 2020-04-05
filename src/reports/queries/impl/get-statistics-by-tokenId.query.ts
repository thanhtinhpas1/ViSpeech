import { GetStatisticsQuery } from 'reports/dtos/statistics.dto';

export class GetStatisticsByTokenIdQuery extends GetStatisticsQuery {
    constructor(id: string, type: string) {
        super(id, type);
    }
}
