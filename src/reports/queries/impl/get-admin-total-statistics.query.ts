import { GetTotalStatisticsQuery } from 'reports/dtos/statistics.dto';

export class GetAdminTotalStatisticsQuery extends GetTotalStatisticsQuery {
    constructor(type: string) {
        super(type);
    }
}
