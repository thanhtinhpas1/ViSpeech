import { IEvent } from '@nestjs/cqrs';
export declare class PermissionDeletedEvent implements IEvent {
    readonly streamId: string;
    readonly permissionId: string;
    constructor(streamId: string, permissionId: string);
}
