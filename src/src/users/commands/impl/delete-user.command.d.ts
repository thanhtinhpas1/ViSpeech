import { ICommand } from '@nestjs/cqrs';
import { UserIdRequestParamsDto } from 'users/dtos/users.dto';
export declare class DeleteUserCommand implements ICommand {
    readonly streamId: string;
    readonly userIdDto: UserIdRequestParamsDto;
    constructor(streamId: string, userIdDto: UserIdRequestParamsDto);
}
