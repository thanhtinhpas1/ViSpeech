import {IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min} from 'class-validator';
import {Type} from 'class-transformer';

export class GetOrdersByUserIdQuery {
    constructor(userId: string) {
        this.userId = userId;
    }

    @IsNotEmpty()
    @IsString()
    userId: string;

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
