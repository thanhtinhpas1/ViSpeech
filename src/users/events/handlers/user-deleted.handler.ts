import {EventBus, EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {UserDeletedEvent, UserDeletedFailedEvent, UserDeletedSuccessEvent} from '../impl/user-deleted.event';
import {Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDto} from 'users/dtos/users.dto';
import {Repository} from 'typeorm';

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
    constructor(
        private readonly eventBus: EventBus,
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
    ) {
    }

    async handle(event: UserDeletedEvent) {
        Logger.log(event.userId, 'UserDeletedEvent');
        const {streamId, userId} = event;

        try {
            const user = await this.repository.findOne({_id: userId});
            if (user) {
                await this.repository.delete({_id: userId});
                this.eventBus.publish(new UserDeletedSuccessEvent(streamId, userId));
                return;
            }
            throw new NotFoundException(`User with _id ${userId} does not exist.`);
        } catch (error) {
            this.eventBus.publish(new UserDeletedFailedEvent(streamId, userId, error.message));
        }
    }
}

@EventsHandler(UserDeletedSuccessEvent)
export class UserDeletedSuccessHandler
    implements IEventHandler<UserDeletedSuccessEvent> {
    handle(event: UserDeletedSuccessEvent) {
        Logger.log(event.userId, 'UserDeletedSuccessEvent');
    }
}

@EventsHandler(UserDeletedFailedEvent)
export class UserDeletedFailedHandler
    implements IEventHandler<UserDeletedFailedEvent> {
    handle(event: UserDeletedFailedEvent) {
        Logger.log(event.error, 'UserDeletedFailedEvent');
    }
}
