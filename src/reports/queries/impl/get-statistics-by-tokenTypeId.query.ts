import { GetStatisticsQuery } from 'reports/dtos/statistics.dto';

export class GetStatisticsByTokenTypeIdQuery extends GetStatisticsQuery {
    constructor(id: string, type: string) {
        super(id, type);
    }
}
