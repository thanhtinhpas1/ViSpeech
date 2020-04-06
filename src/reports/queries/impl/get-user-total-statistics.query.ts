import { GetTotalStatisticsQuery } from 'reports/dtos/statistics.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class GetUserTotalStatisticsQuery extends GetTotalStatisticsQuery {
    constructor(userId: string, totalType: string, type: string) {
        super(totalType, type);
        this.userId = userId;
    }

    @IsOptional()
    @IsString()
    @IsUUID()
    userId: string;
}
