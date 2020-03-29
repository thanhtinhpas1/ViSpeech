import { IEvent } from '@nestjs/cqrs';
import { UserDto } from '../../dtos/users.dto';
export declare class UserUpdatedEvent implements IEvent {
    readonly streamId: string;
    readonly userDto: UserDto;
    constructor(streamId: string, userDto: UserDto);
}
export declare class UserUpdatedSuccessEvent implements IEvent {
    readonly streamId: string;
    readonly userDto: UserDto;
    constructor(streamId: string, userDto: UserDto);
}
export declare class UserUpdatedFailedEvent implements IEvent {
    readonly streamId: string;
    readonly userDto: UserDto;
    readonly error: object;
    constructor(streamId: string, userDto: UserDto, error: object);
}
