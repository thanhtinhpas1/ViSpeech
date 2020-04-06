import { GetTotalStatisticsQuery } from 'reports/dtos/statistics.dto';

export class GetAdminTotalStatisticsQuery extends GetTotalStatisticsQuery {
    constructor(totalType: string, type: string) {
        super(totalType, type);
    }
}
