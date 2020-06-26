import { IEvent } from '@nestjs/cqrs';

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