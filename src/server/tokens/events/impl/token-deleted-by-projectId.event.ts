import { IEvent } from "@nestjs/cqrs";

export class TokenDeletedByProjectIdEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectId: string
    ) {
    }
}

export class TokenDeletedByProjectIdSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectId: string
    ) {
    }
}

export class TokenDeletedByProjectIdFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectId: string,
        public readonly error: object
    ) {
    }
}