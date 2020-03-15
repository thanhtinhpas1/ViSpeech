import {IEvent} from '@nestjs/cqrs';

export class ChangedPasswordEvent implements IEvent {
    constructor(
        public readonly userId: any,
        public readonly newPassword: string,
        public readonly oldPassword: string,
    ) {
    }
}