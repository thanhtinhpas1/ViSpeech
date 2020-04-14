import {IEvent} from '@nestjs/cqrs';

export class TokenDeletedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenId: string
    ) {
    }
}

export class TokenDeletedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenId: string
    ) {
    }
}

export class TokenDeletedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenId: string,
        public readonly error: object
    ) {
    }
}

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