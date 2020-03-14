import {IEvent} from "@nestjs/cqrs";
import {UserDto} from "../../dtos/users.dto";

export class UserUpdatedEvent implements IEvent {
    constructor(
        public readonly userDto: UserDto
    ) {
    }
}

export class UserUpdatedSuccessEvent implements IEvent {
    constructor(
        public readonly userDto: UserDto
    ) {
    }
}

export class UserUpdatedFailedEvent implements IEvent {
    constructor(
        public readonly error: object
    ) {
    }
}
