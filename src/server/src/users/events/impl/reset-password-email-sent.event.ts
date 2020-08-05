import { IEvent } from '@nestjs/cqrs';

export class ResetPasswordEmailSentEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly email: string
    ) {
    }
}

export class ResetPasswordEmailSentSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly email: string
    ) {
    }
}

export class ResetPasswordEmailSentFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly email: string,
        public readonly error: object
    ) {
    }
}
