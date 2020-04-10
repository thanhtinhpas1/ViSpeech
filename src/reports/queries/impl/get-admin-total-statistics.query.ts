import { GetTotalStatisticsQuery } from 'reports/dtos/statistics.dto';

export class GetAdminTotalStatisticsQuery extends GetTotalStatisticsQuery {
    constructor(statisticsType: string, timeType: string) {
        super(statisticsType, timeType);
    }
}
