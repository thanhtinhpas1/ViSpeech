import { IsString, IsNotEmpty, IsOptional, IsNumber, IsPositive, Min } from "class-validator";
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
    @Min(0)
    offset: number;
}
