import { IEvent } from '@nestjs/cqrs';

export class EmailVerifiedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly emailToken: string
    ) {
    }
}

export class EmailVerifiedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly emailToken: string,
        public readonly newToken: string
    ) {
    }
}

export class EmailVerifiedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly emailToken: string,
        public readonly error: object
    ) {
    }
}
