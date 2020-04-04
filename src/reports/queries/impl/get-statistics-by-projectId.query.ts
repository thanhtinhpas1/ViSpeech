import { IsOptional, IsString, IsIn, IsUUID } from 'class-validator';
import { CONSTANTS } from 'common/constant';
import { GetStatisticsQuery } from 'reports/dtos/statistics.dto';

export class GetStatisticsByProjectIdQuery extends GetStatisticsQuery {
    constructor(id: string, type: string) {
        super();
        this.id = id;
        this.type = type;
    }

    @IsOptional()
    @IsString()
    @IsUUID()
    id: string;

    @IsOptional()
    @IsString()
    @IsIn([CONSTANTS.STATISTICS_TYPE.DATE, CONSTANTS.STATISTICS_TYPE.WEEK, CONSTANTS.STATISTICS_TYPE.MONTH, 
        CONSTANTS.STATISTICS_TYPE.QUARTER, CONSTANTS.STATISTICS_TYPE.YEAR])
    type: string;
}


