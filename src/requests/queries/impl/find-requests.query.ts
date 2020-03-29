import { IsNumber, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";

export class FindRequestsQuery {
    @IsOptional()
    @IsPositive()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
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