import { EventBus, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent, UserCreatedFailedEvent, UserCreatedSuccessEvent, UserCreationStartedEvent } from '../impl/user-created.event';
import { Repository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
export declare class UserCreationStartedHandler implements IEventHandler<UserCreationStartedEvent> {
    handle(event: UserCreationStartedEvent): void;
}
export declare class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
    private readonly eventBus;
    private readonly userRepository;
    constructor(eventBus: EventBus, userRepository: Repository<UserDto>);
    handle(event: UserCreatedEvent): Promise<void>;
}
export declare class UserCreatedSuccessHandler implements IEventHandler<UserCreatedSuccessEvent> {
    handle(event: UserCreatedSuccessEvent): void;
}
export declare class UserCreatedFailHandler implements IEventHandler<UserCreatedFailedEvent> {
    handle(event: UserCreatedFailedEvent): void;
}
