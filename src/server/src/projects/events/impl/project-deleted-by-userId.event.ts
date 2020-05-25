import { IEvent } from '@nestjs/cqrs';

export class ProjectDeletedByUserIdEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userId: string
    ) {
    }
}

export class ProjectDeletedByUserIdSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userId: string
    ) {
    }
}

export class ProjectDeletedByUserIdFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userId: string,
        public readonly error: object
    ) {
    }
}