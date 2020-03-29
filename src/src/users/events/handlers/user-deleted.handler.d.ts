import { EventBus, IEventHandler } from '@nestjs/cqrs';
import { UserDeletedEvent, UserDeletedFailedEvent, UserDeletedSuccessEvent } from '../impl/user-deleted.event';
import { UserDto } from 'users/dtos/users.dto';
import { Repository } from 'typeorm';
export declare class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
    private readonly eventBus;
    private readonly repository;
    constructor(eventBus: EventBus, repository: Repository<UserDto>);
    handle(event: UserDeletedEvent): Promise<void>;
}
export declare class UserDeletedSuccessHandler implements IEventHandler<UserDeletedSuccessEvent> {
    handle(event: UserDeletedSuccessEvent): void;
}
export declare class UserDeletedFailedHandler implements IEventHandler<UserDeletedFailedEvent> {
    handle(event: UserDeletedFailedEvent): void;
}
