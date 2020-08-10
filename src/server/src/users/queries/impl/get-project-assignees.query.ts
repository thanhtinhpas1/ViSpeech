import { IsString, IsOptional, IsNumber, Min, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseSortClass } from 'base/base-sort.class';

export class GetProjectAssigneesQuery {
    constructor() {}

    @IsString()
    @IsOptional()
    projectId: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
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