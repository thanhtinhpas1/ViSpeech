import { IEvent } from '@nestjs/cqrs';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { UserDto } from '../../../users/dtos/users.dto';

export class FreeTokenCreatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userDto: UserDto,
    ) {
    }
}

export class FreeTokenCreatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenDto: any
    ) {
    }
}

export class FreeTokenCreatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly tokenDto: TokenDto,
        public readonly error: object
    ) {
    }
}
