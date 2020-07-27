import { IsNumber, IsObject, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUsernamesQuery {
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
