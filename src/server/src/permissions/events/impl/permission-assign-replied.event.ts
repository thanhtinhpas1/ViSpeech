import {IEvent} from '@nestjs/cqrs';
import {PermissionResponseDto} from 'permissions/dtos/permissions.dto';

export class PermissionAssignRepliedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionResponseDto: PermissionResponseDto
    ) {
    }
}

export class PermissionAssignRepliedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionResponseDto: PermissionResponseDto
    ) {
    }
}

export class PermissionAssignRepliedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionResponseDto: PermissionResponseDto,
        public readonly error: object,
    ) {
    }
}