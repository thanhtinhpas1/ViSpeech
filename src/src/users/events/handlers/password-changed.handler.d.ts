import { EventBus, IEventHandler } from '@nestjs/cqrs';
import { PasswordChangedEvent } from '../impl/password-changed.event';
import { UserDto } from '../../dtos/users.dto';
import { Repository } from 'typeorm';
export declare class PasswordChangedHandler implements IEventHandler<PasswordChangedEvent> {
    private readonly eventBus;
    private readonly repository;
    constructor(eventBus: EventBus, repository: Repository<UserDto>);
    handle(event: PasswordChangedEvent): Promise<void>;
}
