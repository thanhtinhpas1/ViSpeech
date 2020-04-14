import { IEvent } from '@nestjs/cqrs';

export class ProjectDeletedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectId: string
    ) {
    }
}

export class ProjectDeletedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectId: string
    ) {
    }
}

export class ProjectDeletedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectId: string,
        public readonly error: object
    ) {
    }
}