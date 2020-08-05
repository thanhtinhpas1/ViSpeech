import { IEvent } from '@nestjs/cqrs';
import { ResetPasswordBody } from 'users/dtos/users.dto';

export class PasswordResetEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly resetPasswordBody: ResetPasswordBody
    ) {
    }
}

export class PasswordResetSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly resetPasswordBody: ResetPasswordBody
    ) {
    }
}

export class PasswordResetFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly resetPasswordBody: ResetPasswordBody,
        public readonly error: object,
    ) {
    }
}