import {IEvent} from '@nestjs/cqrs';

export class PermissionDeletedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionId: string
    ) {
    }
}

export class PermissionDeletedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionId: string
    ) {
    }
}

export class PermissionDeletedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionId: string,
        public readonly error: object,
    ) {
    }
}