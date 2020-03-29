import { IEvent } from '@nestjs/cqrs';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
export declare class PermissionCreatedEvent implements IEvent {
    readonly streamId: string;
    readonly permissionDto: PermissionDto;
    constructor(streamId: string, permissionDto: PermissionDto);
}
export declare class PermissionCreatedSuccessEvent implements IEvent {
    readonly streamId: string;
    readonly permissionDto: any;
    constructor(streamId: string, permissionDto: any);
}
export declare class PermissionCreatedFailedEvent implements IEvent {
    readonly streamId: string;
    readonly permissionDto: PermissionDto;
    readonly error: object;
    constructor(streamId: string, permissionDto: PermissionDto, error: object);
}
