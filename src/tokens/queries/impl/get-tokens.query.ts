import {IsNumber, IsOptional, IsPositive, Min} from 'class-validator';
import {Type} from 'class-transformer';

export class GetTokensQuery {
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
}

export class GetTokenTypesQuery {
    constructor() {
    }
}
