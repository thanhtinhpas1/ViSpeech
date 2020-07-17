import { GetStatisticsBaseQuery } from 'reports/dtos/statistics.dto';

export class GetStatisticsByIdQuery extends GetStatisticsBaseQuery {
    constructor(id: string, statisticsType: string, timeType: string) {
        super(id, statisticsType, timeType);
    }
}
