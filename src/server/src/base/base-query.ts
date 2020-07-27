import { IsNumber, IsObject, IsOptional, IsPositive, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseSortClass } from './base-sort.class';

export class BaseQuery {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    limit: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    offset: number;

    @IsOptional()
    @IsObject()
    filters: Object;

    @IsOptional()
    @ValidateNested()
    @Type(() => BaseSortClass)
    @IsObject()
    order: BaseSortClass;
}