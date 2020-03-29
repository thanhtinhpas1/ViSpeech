import { IEvent } from '@nestjs/cqrs';
import { PermissionDto } from '../../dtos/permissions.dto';
export declare class PermissionUpdatedEvent implements IEvent {
    readonly streamId: string;
    readonly permissionDto: PermissionDto;
    constructor(streamId: string, permissionDto: PermissionDto);
}
