import { IEvent } from '@nestjs/cqrs';

export class PermissionDeletedByUserIdEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userId: string
    ) {
    }
}

export class PermissionDeletedByUserIdSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userId: string
    ) {
    }
}

export class PermissionDeletedByUserIdFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userId: string,
        public readonly error: object,
    ) {
    }
}