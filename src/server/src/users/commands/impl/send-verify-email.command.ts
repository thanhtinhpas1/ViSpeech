import { ICommand } from '@nestjs/cqrs';
import { UserIdRequestParamsDto } from 'users/dtos/users.dto';

export class SendVerifyEmailCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly userIdDto: UserIdRequestParamsDto
    ) {
    }
}
