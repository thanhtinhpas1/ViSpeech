import { ICommand } from '@nestjs/cqrs';
import { ResetPasswordBody } from 'users/dtos/users.dto';

export class ResetPasswordCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly resetPasswordBody: ResetPasswordBody,
    ) {
    }
}