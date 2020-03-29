import { EventBus, IEventHandler } from '@nestjs/cqrs';
import { UserUpdatedEvent, UserUpdatedFailedEvent, UserUpdatedSuccessEvent } from '../impl/user-updated.event';
import { UserDto } from 'users/dtos/users.dto';
import { Repository } from 'typeorm';
export declare class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
    private readonly repository;
    private readonly eventBus;
    constructor(repository: Repository<UserDto>, eventBus: EventBus);
    handle(event: UserUpdatedEvent): Promise<void>;
}
export declare class UserUpdatedSuccessHandler implements IEventHandler<UserUpdatedSuccessEvent> {
    handle(event: UserUpdatedSuccessEvent): void;
}
export declare class UserUpdatedFailedHandler implements IEventHandler<UserUpdatedFailedEvent> {
    handle(event: UserUpdatedFailedEvent): void;
}
