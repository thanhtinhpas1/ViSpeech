import { IsNumber, IsObject, IsOptional, IsPositive, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseSortClass } from 'base/base-sort.class';

export class GetOrdersQuery {
    constructor() {
    }

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    limit: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    offset: number;

    @IsOptional()
    @IsObject()
    filters: Object;

    @IsOptional()
    @ValidateNested()
    @Type(() => BaseSortClass)
    @IsObject()
    sort: BaseSortClass;

    @IsOptional()
    @IsObject()
    advancedFilters: Object;
}
