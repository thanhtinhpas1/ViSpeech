import { EventsHandler, IEventHandler, EventBus } from "@nestjs/cqrs";
import {
  UserCreatedEvent,
  UserCreationStartedEvent,
  UserCreatedFailedEvent,
  UserCreatedSuccessEvent,
} from "../impl/user-created.event";
import { Logger } from "@nestjs/common";
import { getMongoRepository } from "typeorm";
import { UserDto } from "users/dtos/users.dto";
import { Utils } from "utils";
import { RoleDto } from "roles/dtos/roles.dto";

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
    const transactionId = event.transactionId;

    try {
      user.password = Utils.hashPassword(user.password);
      const formattedRoles = Utils.formatUserRoles(user.roles);
      user.roles = formattedRoles.map(role => new RoleDto(role.name));
      user.roles.forEach(role => delete role._id);
      user.transactionId = transactionId;
      const newUser = await getMongoRepository(UserDto).save(user);
      this.eventBus.publish(new UserCreatedSuccessEvent(event.transactionId, newUser))
    } catch (error) {
      this.eventBus.publish(new UserCreatedFailedEvent(event.transactionId, user, error))
    }
  }
}

@EventsHandler(UserCreatedSuccessEvent)
export class UserCreatedSuccessHandler
  implements IEventHandler<UserCreatedSuccessEvent> {
  handle(event: UserCreatedSuccessEvent) {
    // Logger.log(event, "UserCreatedSuccessEvent");
  }
}

@EventsHandler(UserCreatedFailedEvent)
export class UserCreatedFailedHandler
  implements IEventHandler<UserCreatedFailedEvent> {
  handle(event: UserCreatedFailedEvent) {
    // Logger.log(event, "UserCreatedFailedEvent");
  }
}
