import { IEvent } from '@nestjs/cqrs';

export class PermissionDeletedByProjectIdEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectId: string
    ) {
    }
}

export class PermissionDeletedByProjectIdSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectId: string
    ) {
    }
}

export class PermissionDeletedByProjectIdFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectId: string,
        public readonly error: object,
    ) {
    }
}