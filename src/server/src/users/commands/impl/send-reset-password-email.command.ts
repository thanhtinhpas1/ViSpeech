import { ICommand } from '@nestjs/cqrs';

export class SendResetPasswordEmailCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly email: string
    ) {
    }
}
