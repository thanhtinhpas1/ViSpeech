import { IEvent } from '@nestjs/cqrs';

export class TokenDeletedByUserIdEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userId: string
    ) {
    }
}

export class TokenDeletedByUserIdSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userId: string
    ) {
    }
}

export class TokenDeletedByUserIdFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userId: string,
        public readonly error: object
    ) {
    }
}