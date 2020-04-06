import { GetTotalStatisticsQuery } from 'reports/dtos/statistics.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class GetUserTotalStatisticsQuery extends GetTotalStatisticsQuery {
    constructor(userId: string, statisticsType: string, timeType: string) {
        super(statisticsType, timeType);
        this.userId = userId;
    }

    @IsOptional()
    @IsString()
    @IsUUID()
    userId: string;
}
