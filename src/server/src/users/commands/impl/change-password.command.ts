import { ICommand } from '@nestjs/cqrs';
import { ChangePasswordBody } from 'users/dtos/users.dto';

export class ChangePasswordCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly changePasswordBody: ChangePasswordBody,
    ) {
    }
}