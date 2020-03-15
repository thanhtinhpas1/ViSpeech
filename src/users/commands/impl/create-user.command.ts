import {ICommand} from '@nestjs/cqrs';
import {UserDto} from '../../dtos/users.dto';

export class CreateUserStartCommand implements ICommand {
    constructor(
        public readonly _id: string,
        public readonly userDto: UserDto
    ) {
    }
}

export class CreateUserCommand implements ICommand {
    constructor(
        public readonly _id: string,
        public readonly userDto: UserDto
    ) {
    }
}
