import { ICommand } from '@nestjs/cqrs';
import { PermissionResponseDto } from 'permissions/dtos/permissions.dto';
export declare class ReplyPermissionAssignCommand implements ICommand {
    readonly streamId: string;
    readonly permissionResponseDto: PermissionResponseDto;
    constructor(streamId: string, permissionResponseDto: PermissionResponseDto);
}
