import { GetStatisticsQuery } from 'reports/dtos/statistics.dto';

export class GetStatisticsByIdQuery extends GetStatisticsQuery {
    constructor(id: string, statisticsType: string, timeType: string) {
        super(id, statisticsType, timeType);
    }
}
