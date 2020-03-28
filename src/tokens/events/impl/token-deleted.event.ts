import {IEvent} from '@nestjs/cqrs';

export class TokenDeletedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenId: string
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