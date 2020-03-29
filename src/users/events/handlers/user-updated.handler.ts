import {EventBus, EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {UserUpdatedEvent, UserUpdatedFailedEvent, UserUpdatedSuccessEvent} from '../impl/user-updated.event';
import {Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDto} from 'users/dtos/users.dto';
import {Repository} from 'typeorm';
import {Utils} from 'utils';

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
        const {streamId, userDto} = event;
        const { _id, ...userInfo } = userDto;

        try {
            const user = await this.repository.findOne({ _id });
            if (!user) {
                throw new NotFoundException(`User with _id ${_id} does not exist.`);
            }

            const formattedInfo = Utils.removePropertiesFromObject(userInfo, ['email', 'password', 'roles']);
            await this.repository.update({ _id }, formattedInfo);
            this.eventBus.publish(new UserUpdatedSuccessEvent(streamId, userDto));
        } catch (error) {
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
