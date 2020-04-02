import {Inject, Logger} from '@nestjs/common';
import {EventBus, EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {InjectRepository} from '@nestjs/typeorm';
import {RoleDto} from 'roles/dtos/roles.dto';
import {Repository} from 'typeorm';
import {UserDto} from 'users/dtos/users.dto';
import {Utils} from 'utils';
import {
    UserCreatedEvent,
    UserCreatedFailedEvent,
    UserCreatedSuccessEvent,
    UserCreationStartedEvent
} from '../impl/user-created.event';
import {config} from "../../../../config";
import {ClientKafka} from "@nestjs/microservices";

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
            user.roles = user.roles.map(role => new RoleDto(role.name));
            await this.userRepository.save(user);
            this.eventBus.publish(new UserCreatedSuccessEvent(streamId, userDto));
        } catch (error) {
            this.eventBus.publish(new UserCreatedFailedEvent(streamId, userDto, error.message));
        }
    }
}

@EventsHandler(UserCreatedSuccessEvent)
export class UserCreatedSuccessHandler implements IEventHandler<UserCreatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
    }

    handle(event: UserCreatedSuccessEvent) {
        this.clientKafka.emit('UserCreatedSuccessEvent', event.userDto);
        Logger.log(event.userDto.username, 'UserCreatedSuccessEvent');
    }
}

@EventsHandler(UserCreatedFailedEvent)
export class UserCreatedFailHandler implements IEventHandler<UserCreatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
    }

    handle(event: UserCreatedFailedEvent) {
        this.clientKafka.emit('UserCreatedFailedEvent', event.error);
        Logger.log(event.error, 'UserCreatedFailedEvent');
    }
}
