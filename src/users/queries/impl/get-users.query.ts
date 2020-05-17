import { IsOptional, IsNumber, Min, IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { BaseSortClass } from "base/base-sort.class";

export class GetUsersQuery {
    constructor() { }

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
