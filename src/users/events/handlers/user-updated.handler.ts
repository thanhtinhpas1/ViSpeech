import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserUpdatedEvent, UserUpdatedFailedEvent, UserUpdatedSuccessEvent } from '../impl/user-updated.event';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { Repository } from 'typeorm';
import { Utils } from 'utils';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
    constructor(
        @InjectRepository(UserDto)
        private readonly repository: Repository<UserDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: UserUpdatedEvent) {
        Logger.log(event.userDto.username, 'UserUpdatedEvent');
        const { streamId, userDto } = event;

        try {
            const formattedUserDto = Utils.removePropertiesFromObject(userDto, ['email', 'assignerId', 'password', 'roles']);
            await this.repository.update({ _id: userDto._id }, formattedUserDto);
            this.eventBus.publish(new UserUpdatedSuccessEvent(streamId, userDto));
        } catch(error) {
            this.eventBus.publish(new UserUpdatedFailedEvent(streamId, userDto, error));
        }
    }
}

@EventsHandler(UserUpdatedSuccessEvent)
export class UserUpdatedSuccessHandler
    implements IEventHandler<UserUpdatedSuccessEvent> {
    handle(event: UserUpdatedSuccessEvent) {
        Logger.log(event.userDto.username, 'UserUpdatedSuccessEvent');
    }
}

@EventsHandler(UserUpdatedFailedEvent)
export class UserUpdatedFailedHandler
    implements IEventHandler<UserUpdatedFailedEvent> {
    handle(event: UserUpdatedFailedEvent) {
        Logger.log(event.error, 'UserUpdatedFailedEvent');
    }
}
