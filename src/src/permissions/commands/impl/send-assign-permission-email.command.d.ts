import { ICommand } from '@nestjs/cqrs';
import { PermissionAssignDto } from '../../dtos/permissions.dto';
export declare class SendAssignPermissionEmailCommand implements ICommand {
    readonly streamId: string;
    readonly permissionAssignDto: PermissionAssignDto;
    constructor(streamId: string, permissionAssignDto: PermissionAssignDto);
}
