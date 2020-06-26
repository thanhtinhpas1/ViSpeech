import { IsNumber, IsOptional, IsString, IsUUID, Min, IsObject, ValidateNested, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { BaseSortClass } from "base/base-sort.class";

export class FindRequestsByUserIdQuery {
    constructor(userId: string) {
        this.userId = userId;
    }

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
    userId: string;

    @IsOptional()
    @IsObject()
    filters: Object;

    @IsOptional()
    @ValidateNested()
    @Type(() => BaseSortClass)
    @IsObject()
    sort: BaseSortClass;
}