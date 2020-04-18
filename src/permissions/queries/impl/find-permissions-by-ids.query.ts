import {IsString, IsUUID, IsOptional} from 'class-validator';

export class FindPermisisonsByIdsQuery {
    constructor() { }

    @IsOptional()
    @IsUUID()
    @IsString()
    assigneeId: string;

    @IsOptional()
    @IsUUID()
    @IsString()
    assignerId: string;

    @IsOptional()
    @IsUUID()
    @IsString()
    projectId: string;
}
