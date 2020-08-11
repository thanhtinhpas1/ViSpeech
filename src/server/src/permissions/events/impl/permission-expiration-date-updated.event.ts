import { IEvent } from '@nestjs/cqrs';
import { AssigneePermissionDto } from 'permissions/dtos/permissions.dto';

export class PermissionExpirationDateUpdatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly assigneePermissionDto: AssigneePermissionDto,
        public readonly expiresIn: number
    ) {
    }
}

export class PermissionExpirationDateUpdatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly assigneePermissionDto: AssigneePermissionDto,
        public readonly expiresIn: number
    ) {
    }
}

export class PermissionExpirationDateUpdatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly assigneePermissionDto: AssigneePermissionDto,
        public readonly expiresIn: number,
        public readonly error: object,
    ) {
    }
}
