import { GetTotalStatisticsBaseQuery } from 'reports/dtos/statistics.dto';

export class GetAdminTotalStatisticsQuery extends GetTotalStatisticsBaseQuery {
    constructor(statisticsType: string, timeType: string) {
        super(statisticsType, timeType);
    }
}
