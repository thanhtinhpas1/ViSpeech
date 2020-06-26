import { IEvent } from '@nestjs/cqrs';
import { PermissionDto } from '../../dtos/permissions.dto';

export class PermissionUpdatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionDto: PermissionDto) {
    }
}

export class PermissionUpdatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionDto: PermissionDto
    ) {
    }
}

export class PermissionUpdatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionDto: PermissionDto,
        public readonly error: object,
    ) {
    }
}
