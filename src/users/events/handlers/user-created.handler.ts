import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { getMongoRepository } from "typeorm";
import { UserDto } from "users/dtos/users.dto";
import { Utils } from "utils";
import { UserCreatedEvent, UserCreatedFailEvent, UserCreationStartedEvent } from "../impl/user-created.event";

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
  ) { }

  async handle(event: UserCreatedEvent) {
    try {
      const user = event.userDto;
      const transactionId = event.transactionId;
      user.password = Utils.hashPassword(user.password);
      user.roles = Utils.updateUserRoles(user.roles);
      user.transactionId = transactionId;
      Logger.log(event.transactionId, "UserCreatedEvent");
      getMongoRepository(UserDto).save(user);
    } catch (err) {
      Logger.error(err.message);
    }
  }
}

@EventsHandler(UserCreatedFailEvent)
export class UserCreatedFailHandler
  implements IEventHandler<UserCreatedFailEvent> {
  handle(event: UserCreatedFailEvent) {
    Logger.log(event.transactionId, "UserCreatedFailEvent");
  }
}
