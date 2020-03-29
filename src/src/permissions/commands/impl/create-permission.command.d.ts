import { ICommand } from '@nestjs/cqrs';
import { PermissionDto } from '../../dtos/permissions.dto';
export declare class CreatePermissionCommand implements ICommand {
    readonly streamId: string;
    readonly permissionDto: PermissionDto;
    constructor(streamId: string, permissionDto: PermissionDto);
}
export declare class CreateFreePermissionCommand implements ICommand {
    readonly streamId: string;
    readonly permissionDto: PermissionDto;
    constructor(streamId: string, permissionDto: PermissionDto);
}
export declare class CreateOrderedPermissionCommand implements ICommand {
    readonly streamId: string;
    readonly permissionDto: PermissionDto;
    constructor(streamId: string, permissionDto: PermissionDto);
}
