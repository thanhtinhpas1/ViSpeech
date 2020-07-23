import { IsNumber, IsOptional, Min, IsObject } from "class-validator";
import { Type } from "class-transformer";

export class GetProjectNamesQuery {
    constructor() {
    }

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
}
