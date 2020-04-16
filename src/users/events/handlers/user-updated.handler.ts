import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { Repository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { Utils } from 'utils';
import { config } from '../../../../config';
import { UserUpdatedEvent, UserUpdatedFailedEvent, UserUpdatedSuccessEvent } from '../impl/user-updated.event';

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
        const { _id, ...userInfo } = userDto;

        try {
            const user = await this.repository.findOne({ _id: userDto._id });
            if (!user) {
                throw new NotFoundException(`User with _id ${_id} does not exist.`);
            }

            const formattedInfo = Utils.removePropertiesFromObject(userInfo, ['username', 'email', 'password', 'roles']);
            await this.repository.update({ _id }, formattedInfo);
            this.eventBus.publish(new UserUpdatedSuccessEvent(streamId, userDto));
        } catch (error) {
            this.eventBus.publish(new UserUpdatedFailedEvent(streamId, userDto, error));
        }
    }
}

@EventsHandler(UserUpdatedSuccessEvent)
export class UserUpdatedSuccessHandler implements IEventHandler<UserUpdatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: UserUpdatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.USER_UPDATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.userDto.username, 'UserUpdatedSuccessEvent');
    }
}

@EventsHandler(UserUpdatedFailedEvent)
export class UserUpdatedFailedHandler
    implements IEventHandler<UserUpdatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: UserUpdatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.USER_UPDATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'UserUpdatedFailedEvent');
    }
}
