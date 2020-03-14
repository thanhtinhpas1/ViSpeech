import {EventBus, EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {
  UserCreatedEvent,
  UserCreatedFailEvent,
  UserCreatedSuccessEvent,
  UserCreationStartedEvent,
} from "../impl/user-created.event";
import {Logger} from "@nestjs/common";
import {getMongoRepository} from "typeorm";
import {UserDto} from "users/dtos/users.dto";
import {Utils} from "utils";
import {RoleDto} from "roles/dtos/roles.dto";
import {CONSTANTS} from "../../../common/constant";

@EventsHandler(UserCreationStartedEvent)
export class UserCreationStartedHandler
  implements IEventHandler<UserCreationStartedEvent> {
  handle(event: UserCreationStartedEvent) {
    Logger.log(event.transactionId, "UserCreationStartedEvent");
  }
}

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    private readonly eventBus: EventBus
  ) {}

  async handle(event: UserCreatedEvent) {
    Logger.log(event, "UserCreatedEvent");
    const user = event.userDto;
    try {
      user.password = Utils.hashPassword(user.password);
      user.roles = [new RoleDto(CONSTANTS.ROLE.USER)];
      user.transactionId = event.transactionId;
      const newUser = await getMongoRepository(UserDto).save(user);
      this.eventBus.publish(new UserCreatedSuccessEvent(event.transactionId, newUser))
    } catch (error) {
      this.eventBus.publish(new UserCreatedFailEvent(event.transactionId, user, error))
    }
  }
}

@EventsHandler(UserCreatedSuccessEvent)
export class UserCreatedSuccessHandler
  implements IEventHandler<UserCreatedSuccessEvent> {
  handle(event: UserCreatedSuccessEvent) {
    Logger.log(event.transactionId, "UserCreatedSuccessEvent");
  }
}

@EventsHandler(UserCreatedFailEvent)
export class UserCreatedFailHandler
  implements IEventHandler<UserCreatedFailEvent> {
  handle(event: UserCreatedFailEvent) {
    Logger.log(event.transactionId, "UserCreatedFailEvent");
  }
}
