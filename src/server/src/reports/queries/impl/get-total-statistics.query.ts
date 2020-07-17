import { GetTotalStatisticsBaseQuery } from 'reports/dtos/statistics.dto';
import { CONSTANTS } from 'common/constant';

export class GetTotalStatisticsQuery extends GetTotalStatisticsBaseQuery {
    constructor(timeType: string) {
        super(CONSTANTS.STATISTICS_TYPE.USER, timeType);
    }
}
