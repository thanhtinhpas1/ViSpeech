import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from "@nestjs/microservices";
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { RoleDto } from 'roles/dtos/roles.dto';
import { Repository } from 'typeorm';
import { USER_TYPE, UserDto } from 'users/dtos/users.dto';
import { Utils } from 'utils';
import { config } from "../../../../config";
import {
    UserCreatedEvent,
    UserCreatedFailedEvent,
    UserCreatedSuccessEvent,
    UserCreationStartedEvent
} from '../impl/user-created.event';
import { AuthService } from 'auth/auth.service';

@EventsHandler(UserCreationStartedEvent)
export class UserCreationStartedHandler implements IEventHandler<UserCreationStartedEvent> {
    handle(event: UserCreationStartedEvent) {
        Logger.log(event.userDto.username, 'UserCreationStartedEvent');
    }
}

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
    constructor(
        private readonly eventBus: EventBus,
        private readonly authService: AuthService,
        @InjectRepository(UserDto) private readonly userRepository: Repository<UserDto>,
    ) {
    }

    async handle(event: UserCreatedEvent) {
        Logger.log(event.userDto.username, 'UserCreatedEvent');
        const {streamId, userDto} = event;
        const user = JSON.parse(JSON.stringify(userDto));
        try {
            user.password = Utils.hashPassword(user.password);
            user.roles = Utils.convertToArray(user.roles);
            user.roles = user.roles.map(role => {
                if (role.name === CONSTANTS.ROLE.ADMIN) return new RoleDto(CONSTANTS.ROLE.USER);
                return new RoleDto(role.name)
            });
            user.isActive = true;
            await this.userRepository.save(user);
            if ([USER_TYPE.FACEBOOK, USER_TYPE.GOOGLE].includes(user.userType)) {
                userDto['jwtToken'] = this.authService.generateToken(user._id, user.username, user.roles);
            }
            this.eventBus.publish(new UserCreatedSuccessEvent(streamId, userDto));
        } catch (error) {
            this.eventBus.publish(new UserCreatedFailedEvent(streamId, userDto, error));
        }
    }
}

@EventsHandler(UserCreatedSuccessEvent)
export class UserCreatedSuccessHandler implements IEventHandler<UserCreatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: UserCreatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.USER_CREATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.userDto.username, 'UserCreatedSuccessEvent');
    }
}

@EventsHandler(UserCreatedFailedEvent)
export class UserCreatedFailedHandler implements IEventHandler<UserCreatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
    }

    handle(event: UserCreatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.USER_CREATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'UserCreatedFailedEvent');
    }
}
