import { ICommand } from '@nestjs/cqrs';
import { PermissionDto } from '../../dtos/permissions.dto';
export declare class UpdatePermissionCommand implements ICommand {
    readonly streamId: string;
    readonly permissionDto: PermissionDto;
    constructor(streamId: string, permissionDto: PermissionDto);
}
