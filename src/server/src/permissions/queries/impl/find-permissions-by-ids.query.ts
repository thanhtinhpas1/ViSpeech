import { IsOptional, IsString, IsUUID } from 'class-validator';

export class FindPermissionsByIdsQuery {
    constructor() {
    }

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
