import { IEvent } from "@nestjs/cqrs";
import { PermissionAssignDto } from "permissions/dtos/permissions.dto";

export class PermissionAssignEmailSentEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionAssignDto: PermissionAssignDto
    ) { }
}

export class PermissionAssignEmailSentSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionAssignDto: PermissionAssignDto
    ) { }
}

export class PermissionAssignEmailSentFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionAssignDto: PermissionAssignDto,
        public readonly error: object,
    ) { }
}