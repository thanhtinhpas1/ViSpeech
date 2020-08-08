import { IEvent } from '@nestjs/cqrs';
import { PermissionAssignDto, PermissionId } from 'permissions/dtos/permissions.dto';

export class PermissionAssignEmailSentEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionAssignDto: PermissionAssignDto,
        public readonly permissionIds: PermissionId[],
    ) {
    }
}

export class PermissionAssignEmailSentSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionAssignDto: PermissionAssignDto,
        public readonly permissionIds: PermissionId[],
    ) {
    }
}

export class PermissionAssignEmailSentFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionAssignDto: PermissionAssignDto,
        public readonly error: object,
    ) {
    }
}