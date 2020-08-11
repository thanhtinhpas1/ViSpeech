import { IEvent } from '@nestjs/cqrs';
import { AssigneePermissionDto } from 'permissions/dtos/permissions.dto';

export class PermissionForAssigneeDeletedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly assigneePermissionDto: AssigneePermissionDto
    ) {
    }
}

export class PermissionForAssigneeDeletedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly assigneePermissionDto: AssigneePermissionDto
    ) {
    }
}

export class PermissionForAssigneeDeletedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly assigneePermissionDto: AssigneePermissionDto,
        public readonly error: object,
    ) {
    }
}