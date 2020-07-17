import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { Repository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { Utils } from 'utils';
import { config } from '../../../../config';
import { UserUpdatedEvent, UserUpdatedFailedEvent, UserUpdatedSuccessEvent } from '../impl/user-updated.event';
import { RoleDto } from 'roles/dtos/roles.dto';

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
        const {_id, ...userInfo} = userDto;

        try {
            const user = await this.repository.findOne({_id});

            let formattedInfo = Utils.removePropertiesFromObject(userInfo, [ 'password', 'isActive', 'username', 'userType', 'socialId' ]);
            if (Utils.isEmailVerified(user.roles)) {
                formattedInfo = Utils.removePropertyFromObject(formattedInfo, 'email');
            }
            if (formattedInfo.roles) {
                formattedInfo.roles = Utils.convertToArray(formattedInfo.roles).map(role => {
                    return new RoleDto(role.name)
                });
            }
            await this.repository.update({_id}, {...formattedInfo, updatedDate: new Date()});
            this.eventBus.publish(new UserUpdatedSuccessEvent(streamId, { ...user, ...formattedInfo }));
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
