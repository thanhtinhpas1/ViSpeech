import { GetStatisticsQuery } from 'reports/dtos/statistics.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class GetStatisticsByTokenTypeIdAndUserIdQuery extends GetStatisticsQuery {
    constructor(id: string, userId: string, type: string) {
        super(id, type);
        this.userId = userId;
    }

    @IsOptional()
    @IsString()
    @IsUUID()
    userId: string;
}
