import { GetStatisticsBaseQuery } from 'reports/dtos/statistics.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class GetStatisticsForAssignersQuery extends GetStatisticsBaseQuery {
    constructor(projectId: string, assignerId: string, assigneeId: string, tokenId: string, statisticsType: string, timeType: string) {
        super(projectId, statisticsType, timeType);
        this.assignerId = assignerId;
        this.assigneeId = assigneeId;
        this.tokenId = tokenId;
    }

    @IsOptional()
    @IsString()
    @IsUUID()
    assignerId: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    assigneeId: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    tokenId: string;
}
