import { IEvent } from '@nestjs/cqrs';
import { PermissionResponseDto } from 'permissions/dtos/permissions.dto';
export declare class PermissionAssignRepliedEvent implements IEvent {
    readonly streamId: string;
    readonly permissionResponseDto: PermissionResponseDto;
    constructor(streamId: string, permissionResponseDto: PermissionResponseDto);
}
