import { IEvent } from '@nestjs/cqrs';
import { PermissionDto } from 'permissions/dtos/permissions.dto';

export class PermissionCreatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionDto: PermissionDto
    ) {
    }
}

export class PermissionCreatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionDto: any
    ) {
    }
}

export class PermissionCreatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionDto: PermissionDto,
        public readonly error: object,
    ) {
    }
}
