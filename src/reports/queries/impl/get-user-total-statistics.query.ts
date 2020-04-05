import { GetTotalStatisticsQuery } from 'reports/dtos/statistics.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class GetUserTotalStatisticsQuery extends GetTotalStatisticsQuery {
    constructor(userId: string, type: string) {
        super(type);
        this.userId = userId;
    }

    @IsOptional()
    @IsString()
    @IsUUID()
    userId: string;
}
