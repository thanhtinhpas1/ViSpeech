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
    @IsPositive()
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
    constructor(id: string, userId: string, type: string, totalType: string) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.totalType = totalType;
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
    @IsIn([CONSTANTS.STATISTICS_TYPE.DATE, CONSTANTS.STATISTICS_TYPE.WEEK, CONSTANTS.STATISTICS_TYPE.MONTH,
    CONSTANTS.STATISTICS_TYPE.QUARTER, CONSTANTS.STATISTICS_TYPE.YEAR])
    type: string;

    @IsOptional()
    @IsString()
    @IsIn([CONSTANTS.TOTAL_STATISTICS_TYPE.TOKEN, CONSTANTS.TOTAL_STATISTICS_TYPE.PROJECT,
    CONSTANTS.TOTAL_STATISTICS_TYPE.TOKEN_TYPE, CONSTANTS.TOTAL_STATISTICS_TYPE.USER])
    totalType: string;
}

export class GetStatisticsQuery {
    constructor(id: string, type: string) {
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
    constructor(totalType: string, type: string) {
        this.totalType = totalType;
        this.type = type;
    }

    @IsOptional()
    @IsString()
    @IsIn([CONSTANTS.TOTAL_STATISTICS_TYPE.TOKEN, CONSTANTS.TOTAL_STATISTICS_TYPE.PROJECT,
    CONSTANTS.TOTAL_STATISTICS_TYPE.TOKEN_TYPE, CONSTANTS.TOTAL_STATISTICS_TYPE.USER])
    totalType: string;

    @IsOptional()
    @IsString()
    @IsIn([CONSTANTS.STATISTICS_TYPE.DATE, CONSTANTS.STATISTICS_TYPE.WEEK, CONSTANTS.STATISTICS_TYPE.MONTH,
    CONSTANTS.STATISTICS_TYPE.QUARTER, CONSTANTS.STATISTICS_TYPE.YEAR])
    type: string;

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