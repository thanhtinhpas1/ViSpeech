import {IEvent} from '@nestjs/cqrs';

export class PasswordChangedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userId: string,
        public readonly newPassword: string,
        public readonly oldPassword: string,
    ) {
    }
}

export class PasswordChangedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userId: string,
        public readonly newPassword: string,
        public readonly oldPassword: string,
    ) {
    }
}

export class PasswordChangedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userId: string,
        public readonly newPassword: string,
        public readonly oldPassword: string,
        public readonly error: object,
    ) {
    }
}