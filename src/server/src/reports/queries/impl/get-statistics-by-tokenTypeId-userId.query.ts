import { GetStatisticsBaseQuery } from 'reports/dtos/statistics.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CONSTANTS } from 'common/constant';

export class GetStatisticsByTokenTypeIdAndUserIdQuery extends GetStatisticsBaseQuery {
    constructor(id: string, userId: string, timeType: string) {
        super(id, CONSTANTS.STATISTICS_TYPE.USER_TOKEN_TYPE, timeType);
        this.userId = userId;
    }

    @IsOptional()
    @IsString()
    @IsUUID()
    userId: string;
}
