import { Type } from "class-transformer";
import { IsNumber, IsObject, IsOptional, Min, ValidateNested } from "class-validator";
import { BaseSortClass } from "base/base-sort.class";

export class FindTasksQuery {
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
    filters: Object;

    @IsOptional()
    @ValidateNested()
    @Type(() => BaseSortClass)
    @IsObject()
    sort: BaseSortClass;
}