import { IsNumber, IsObject, IsOptional, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseSortClass } from 'base/base-sort.class';

export class GetMonitorsQuery {
    constructor() {
    }

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    offset: number;

    @IsOptional()
    @IsObject()
    filters: object;

    @IsOptional()
    @ValidateNested()
    @Type(() => BaseSortClass)
    @IsObject()
    sort: BaseSortClass;
}