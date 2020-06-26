import {IEvent} from '@nestjs/cqrs';
import { ChangePasswordBody } from 'users/dtos/users.dto';

export class PasswordChangedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly changePasswordBody: ChangePasswordBody
    ) {
    }
}

export class PasswordChangedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly changePasswordBody: ChangePasswordBody
    ) {
    }
}

export class PasswordChangedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly changePasswordBody: ChangePasswordBody,
        public readonly error: object,
    ) {
    }
}