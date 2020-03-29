import { IEvent } from '@nestjs/cqrs';
import { PermissionAssignDto } from 'permissions/dtos/permissions.dto';
export declare class PermissionAssignEmailSentEvent implements IEvent {
    readonly streamId: string;
    readonly permissionAssignDto: PermissionAssignDto;
    constructor(streamId: string, permissionAssignDto: PermissionAssignDto);
}
export declare class PermissionAssignEmailSentSuccessEvent implements IEvent {
    readonly streamId: string;
    readonly permissionAssignDto: PermissionAssignDto;
    constructor(streamId: string, permissionAssignDto: PermissionAssignDto);
}
export declare class PermissionAssignEmailSentFailedEvent implements IEvent {
    readonly streamId: string;
    readonly permissionAssignDto: PermissionAssignDto;
    readonly error: object;
    constructor(streamId: string, permissionAssignDto: PermissionAssignDto, error: object);
}
