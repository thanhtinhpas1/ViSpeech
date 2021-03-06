import { ICommand } from '@nestjs/cqrs';
import { UserIdRequestParamsDto } from 'users/dtos/users.dto';

export class DeleteUserCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly userIdDto: UserIdRequestParamsDto,
        public readonly isDeleted: boolean) {
    }
}
