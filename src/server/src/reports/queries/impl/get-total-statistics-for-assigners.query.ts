import { GetTotalStatisticsBaseQuery } from 'reports/dtos/statistics.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class GetTotalStatisticsForAssignersQuery extends GetTotalStatisticsBaseQuery {
    constructor(assignerId: string, projectId: string, statisticsType: string, timeType: string) {
        super(statisticsType, timeType);
        this.assignerId = assignerId;
        this.projectId = projectId;
    }

    @IsOptional()
    @IsString()
    @IsUUID()
    assignerId: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    projectId: string;
}
