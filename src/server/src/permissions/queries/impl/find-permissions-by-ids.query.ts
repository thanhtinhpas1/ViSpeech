import { IsOptional, IsString, IsUUID, IsIn } from 'class-validator';
import { CONSTANTS } from 'common/constant';

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

    @IsOptional()
    @IsString()
    @IsIn([CONSTANTS.STATUS.ACCEPTED, CONSTANTS.STATUS.REJECTED, CONSTANTS.STATUS.PENDING, CONSTANTS.STATUS.INVALID])
    status: string;
}
