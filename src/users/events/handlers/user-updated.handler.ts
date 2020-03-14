import {EventBus, EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {UserUpdatedEvent, UserUpdatedFailedEvent, UserUpdatedSuccessEvent} from "../impl/user-updated.event";
import {Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserDto} from "users/dtos/users.dto";
import {Repository} from "typeorm";
import {UserCreatedFailedEvent, UserCreatedSuccessEvent} from "../impl/user-created.event";

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
    constructor(
        @InjectRepository(UserDto)
        private readonly repository: Repository<UserDto>,
        private readonly eventBus: EventBus
    ) {
    }

    async handle(event: UserUpdatedEvent) {
        Logger.log(event, "UserUpdatedEvent");
        const {userDto} = event;
        delete userDto['password'];
        delete userDto['roles'];
        return this.repository.update({_id: userDto._id}, userDto)
            .then(rs => {
                this.eventBus.publish(new UserCreatedSuccessEvent(userDto));
            }).catch(err => {
                Logger.error(err.message, "", "UserUpdatedEvent");
                this.eventBus.publish(new UserCreatedFailedEvent(userDto, err));
            })
    }
}

@EventsHandler(UserUpdatedSuccessEvent)
export class UserUpdatedSuccessHandler
    implements IEventHandler<UserUpdatedSuccessEvent> {
    handle(event: UserUpdatedSuccessEvent) {
        Logger.log(event, "UserDeletedSuccessEvent");
    }
}

@EventsHandler(UserUpdatedFailedEvent)
export class UserUpdatedFailedHandler
    implements IEventHandler<UserUpdatedFailedEvent> {
    handle(event: UserUpdatedFailedEvent
    ) {
        Logger.log(event, "UserUpdatedFailedEvent");
    }
}
