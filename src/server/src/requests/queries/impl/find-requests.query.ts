import { IsNumber, IsObject, IsOptional, IsString, IsUUID, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { BaseSortClass } from "base/base-sort.class";

export class FindRequestsQuery {
    @IsOptional()
    @Type(() => Number)
    @Min(0)
    @IsNumber()
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    offset?: number;

    @IsOptional()
    @IsString()
    @IsUUID()
    tokenId?: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    projectId?: string;

    @IsOptional()
    @IsObject()
    filters: Object;

    @IsOptional()
    @ValidateNested()
    @Type(() => BaseSortClass)
    @IsObject()
    sort: BaseSortClass;
}