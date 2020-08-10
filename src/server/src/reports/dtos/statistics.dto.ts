import { Type } from 'class-transformer';
import {
    IsIn,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsPositive,
    IsString,
    IsUUID,
    Max,
    Min,
    ValidateNested
} from 'class-validator';
import { CONSTANTS } from 'common/constant';
import { ErrorUtils } from 'utils/errorUtils';
import { ERR } from 'common/error';

export class StatisticalDto {
    constructor(data: number, year: number) {
        this.data = data;
        this.year = year;
    }

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    data: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(1970)
    @Max(9999)
    year: number;
}

export class StatisticalObject {
    constructor(from: StatisticalDto, to: StatisticalDto) {
        this.from = from;
        this.to = to;
    }

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => StatisticalDto)
    @IsObject()
    from: StatisticalDto;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => StatisticalDto)
    @IsObject()
    to: StatisticalDto;
}

export class GetStatisticsParam {
    constructor(id: string, userId: string, statisticsType: string, timeType: string) {
        this.id = id;
        this.userId = userId;
        this.statisticsType = statisticsType;
        this.timeType = timeType;
    }

    @IsOptional()
    @IsString()
    @IsUUID()
    id: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    userId: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    assignerId: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    projectId: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    assigneeId: string;

    @IsOptional()
    @IsString()
    @IsIn([CONSTANTS.TIME_TYPE.DATE, CONSTANTS.TIME_TYPE.WEEK, CONSTANTS.TIME_TYPE.MONTH,
        CONSTANTS.TIME_TYPE.QUARTER, CONSTANTS.TIME_TYPE.YEAR], { message: ErrorUtils.getMessage('timeType', ERR.IsIn).message })
    timeType: string;

    @IsOptional()
    @IsString()
    @IsIn([CONSTANTS.STATISTICS_TYPE.TOKEN, CONSTANTS.STATISTICS_TYPE.PROJECT, CONSTANTS.STATISTICS_TYPE.TOKEN_TYPE,
        CONSTANTS.STATISTICS_TYPE.SHARED_PROJECT, CONSTANTS.STATISTICS_TYPE.SHARED_TOKEN, CONSTANTS.STATISTICS_TYPE.USER],
        { message: ErrorUtils.getMessage('statisticsType', ERR.IsIn).message })
    statisticsType: string;
}

export class GetStatisticsBaseQuery {
    constructor(id: string, statisticsType: string, timeType: string) {
        this.id = id;
        this.statisticsType = statisticsType;
        this.timeType = timeType;
    }

    @IsOptional()
    @IsString()
    @IsUUID()
    id: string;

    @IsOptional()
    @IsString()
    @IsIn([CONSTANTS.STATISTICS_TYPE.TOKEN, CONSTANTS.STATISTICS_TYPE.PROJECT, CONSTANTS.STATISTICS_TYPE.TOKEN_TYPE,
        CONSTANTS.STATISTICS_TYPE.SHARED_PROJECT, CONSTANTS.STATISTICS_TYPE.SHARED_TOKEN, CONSTANTS.STATISTICS_TYPE.USER_TOKEN_TYPE],
        { message: ErrorUtils.getMessage('statisticsType', ERR.IsIn).message })
    statisticsType: string;

    @IsOptional()
    @IsString()
    @IsIn([CONSTANTS.TIME_TYPE.DATE, CONSTANTS.TIME_TYPE.WEEK, CONSTANTS.TIME_TYPE.MONTH, CONSTANTS.TIME_TYPE.QUARTER, CONSTANTS.TIME_TYPE.YEAR],
        { message: ErrorUtils.getMessage('timeType', ERR.IsIn).message })
    timeType: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    fromDate: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    toDate: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => StatisticalObject)
    @IsObject()
    weekObj: StatisticalObject;

    @IsOptional()
    @ValidateNested()
    @Type(() => StatisticalObject)
    @IsObject()
    monthObj: StatisticalObject;

    @IsOptional()
    @ValidateNested()
    @Type(() => StatisticalObject)
    @IsObject()
    quarterObj: StatisticalObject;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1970)
    @Max(9999)
    fromYear: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1970)
    @Max(9999)
    toYear: number;
}

export class GetTotalStatisticsBaseQuery {
    constructor(statisticsType: string, timeType: string) {
        this.statisticsType = statisticsType;
        this.timeType = timeType;
    }

    @IsOptional()
    @IsString()
    @IsIn([CONSTANTS.STATISTICS_TYPE.TOKEN, CONSTANTS.STATISTICS_TYPE.PROJECT, CONSTANTS.STATISTICS_TYPE.USER_TOKEN_TYPE,
        CONSTANTS.STATISTICS_TYPE.SHARED_PROJECT, CONSTANTS.STATISTICS_TYPE.SHARED_TOKEN, CONSTANTS.STATISTICS_TYPE.TOKEN_TYPE,
        CONSTANTS.STATISTICS_TYPE.USER], { message: ErrorUtils.getMessage('statisticsType', ERR.IsIn).message })
    statisticsType: string;

    @IsOptional()
    @IsString()
    @IsIn([CONSTANTS.TIME_TYPE.DATE, CONSTANTS.TIME_TYPE.WEEK, CONSTANTS.TIME_TYPE.MONTH, CONSTANTS.TIME_TYPE.QUARTER, CONSTANTS.TIME_TYPE.YEAR],
        { message: ErrorUtils.getMessage('timeType', ERR.IsIn).message })
    timeType: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    fromDate: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    toDate: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => StatisticalObject)
    @IsObject()
    weekObj: StatisticalObject;

    @IsOptional()
    @ValidateNested()
    @Type(() => StatisticalObject)
    @IsObject()
    monthObj: StatisticalObject;

    @IsOptional()
    @ValidateNested()
    @Type(() => StatisticalObject)
    @IsObject()
    quarterObj: StatisticalObject;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1970)
    @Max(9999)
    fromYear: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1970)
    @Max(9999)
    toYear: number;
}