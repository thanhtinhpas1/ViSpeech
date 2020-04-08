import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsObject, ValidateNested, IsNotEmpty, IsString, IsUUID, IsIn, IsOptional, IsInt, Max, Min } from "class-validator";
import { CONSTANTS } from "common/constant";

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
    @IsIn([CONSTANTS.TIME_TYPE.DATE, CONSTANTS.TIME_TYPE.WEEK, CONSTANTS.TIME_TYPE.MONTH,
    CONSTANTS.TIME_TYPE.QUARTER, CONSTANTS.TIME_TYPE.YEAR])
    timeType: string;

    @IsOptional()
    @IsString()
    @IsIn([CONSTANTS.STATISTICS_TYPE.TOKEN, CONSTANTS.STATISTICS_TYPE.PROJECT,
    CONSTANTS.STATISTICS_TYPE.TOKEN_TYPE, CONSTANTS.STATISTICS_TYPE.USER])
    statisticsType: string;
}

export class GetStatisticsQuery {
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
    @IsIn([CONSTANTS.STATISTICS_TYPE.TOKEN, CONSTANTS.STATISTICS_TYPE.PROJECT,
    CONSTANTS.STATISTICS_TYPE.TOKEN_TYPE, CONSTANTS.STATISTICS_TYPE.USER_TOKEN_TYPE])
    statisticsType: string;

    @IsOptional()
    @IsString()
    @IsIn([CONSTANTS.TIME_TYPE.DATE, CONSTANTS.TIME_TYPE.WEEK, CONSTANTS.TIME_TYPE.MONTH,
    CONSTANTS.TIME_TYPE.QUARTER, CONSTANTS.TIME_TYPE.YEAR])
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

export class GetTotalStatisticsQuery {
    constructor(statisticsType: string, timeType: string) {
        this.statisticsType = statisticsType;
        this.timeType = timeType;
    }

    @IsOptional()
    @IsString()
    @IsIn([CONSTANTS.STATISTICS_TYPE.TOKEN, CONSTANTS.STATISTICS_TYPE.PROJECT,
    CONSTANTS.STATISTICS_TYPE.TOKEN_TYPE, CONSTANTS.STATISTICS_TYPE.USER])
    statisticsType: string;

    @IsOptional()
    @IsString()
    @IsIn([CONSTANTS.TIME_TYPE.DATE, CONSTANTS.TIME_TYPE.WEEK, CONSTANTS.TIME_TYPE.MONTH,
    CONSTANTS.TIME_TYPE.QUARTER, CONSTANTS.TIME_TYPE.YEAR])
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