import { IsString, IsNotEmpty, IsOptional, IsNumber, IsPositive } from "class-validator";
import { Type } from "class-transformer";

export class GetUsersQuery {
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
    @IsPositive()
    offset!: number;
}
