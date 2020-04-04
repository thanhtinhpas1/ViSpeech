import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsObject, ValidateNested, IsNotEmpty, IsString, IsUUID, IsIn, IsOptional, IsInt, Max, Min } from "class-validator";
import { CONSTANTS } from "common/constant";

export class StatisticalDto {
    constructor(data: number, year: number) {
        this.data = data;
        this.year = year;
    }
    
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    data: number;

    @Type(() => Number)
    @IsInt()
    @Min(1970)
    @Max(9999)
    year: number;
}

export class StatisticalObject {
    constructor(from: StatisticalDto, to: StatisticalDto) {
        this.from = from;
        this.to = to;
    }

    @ValidateNested()
    @Type(() => StatisticalDto)
    @IsObject()
    from: StatisticalDto;

    @ValidateNested()
    @Type(() => StatisticalDto)
    @IsObject()
    to: StatisticalDto;
}

export class GetStatisticsParam {
    constructor(id: string, type: string) {
        this.id = id;
        this.type = type;
    }

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    @IsIn([CONSTANTS.STATISTICS_TYPE.DATE, CONSTANTS.STATISTICS_TYPE.WEEK, CONSTANTS.STATISTICS_TYPE.MONTH, 
        CONSTANTS.STATISTICS_TYPE.QUARTER, CONSTANTS.STATISTICS_TYPE.YEAR])
    type: string;
}

export class GetStatisticsQuery {
    constructor() {}

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

