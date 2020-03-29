import { ICommand } from '@nestjs/cqrs';
import { UserDto } from '../../dtos/users.dto';
export declare class UpdateUserCommand implements ICommand {
    readonly streamId: string;
    readonly userDto: UserDto;
    constructor(streamId: string, userDto: UserDto);
}
