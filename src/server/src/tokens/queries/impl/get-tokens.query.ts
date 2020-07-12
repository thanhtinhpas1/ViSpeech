import { IsNumber, IsObject, IsOptional, IsPositive, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseSortClass } from 'base/base-sort.class';

export class GetTokensQuery {
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

export class GetTokenTypesQuery {
    constructor() {
    }
}
