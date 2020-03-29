import { IEvent } from '@nestjs/cqrs';
import { UserDto } from '../../dtos/users.dto';
export declare class UserCreationStartedEvent implements IEvent {
    readonly streamId: string;
    readonly userDto: UserDto;
    constructor(streamId: string, userDto: UserDto);
}
export declare class UserCreatedEvent implements IEvent {
    readonly streamId: string;
    readonly userDto: UserDto;
    constructor(streamId: string, userDto: UserDto);
}
export declare class UserCreatedSuccessEvent implements IEvent {
    readonly streamId: string;
    readonly userDto: any;
    constructor(streamId: string, userDto: any);
}
export declare class UserCreatedFailedEvent implements IEvent {
    readonly streamId: string;
    readonly userDto: UserDto;
    readonly error: object;
    constructor(streamId: string, userDto: UserDto, error: object);
}
