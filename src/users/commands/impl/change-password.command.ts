import {ICommand} from '@nestjs/cqrs';

export class ChangePasswordCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly userId: string,
        public readonly newPassword: string,
        public readonly oldPassword: string,
    ) {
    }
}