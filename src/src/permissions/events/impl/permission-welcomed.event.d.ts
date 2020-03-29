import { IEvent } from '@nestjs/cqrs';
export declare class PermissionWelcomedEvent implements IEvent {
    readonly streamId: string;
    readonly permissionId: string;
    constructor(streamId: string, permissionId: string);
}
