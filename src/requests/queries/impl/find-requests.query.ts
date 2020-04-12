import { IsNumber, IsOptional, IsPositive, IsString, IsUUID, Min } from "class-validator";
import { Type } from "class-transformer";

export class FindRequestsQuery {
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsPositive()
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
}