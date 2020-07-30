import { IEvent } from '@nestjs/cqrs';
import { UserDto } from '../../dtos/users.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';

export class UserCreationStartedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userDto: UserDto,
    ) {
    }
}

export class UserCreatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userDto: UserDto,
        public readonly freeToken: TokenDto,
    ) {
    }
}

export class UserCreatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userDto: any,
        public readonly freeToken: TokenDto,
    ) {
    }
}

export class UserCreatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userDto: UserDto,
        public readonly error: object,
    ) {
    }
}