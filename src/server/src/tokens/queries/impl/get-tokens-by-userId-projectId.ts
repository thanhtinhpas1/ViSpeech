import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseSortClass } from 'base/base-sort.class';

export class GetTokensByUserIdAndProjectIdQuery {
    constructor(userId: string, projectId: string) {
        this.userId = userId;
        this.projectId = projectId;
    }

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    projectId: string;

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
    filters: Object;

    @IsOptional()
    @ValidateNested()
    @Type(() => BaseSortClass)
    @IsObject()
    sort: BaseSortClass;
}
