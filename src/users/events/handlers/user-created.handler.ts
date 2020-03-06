import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import {
  UserCreatedEvent,
  UserCreationStartedEvent,
  UserCreatedFailEvent,
} from "../impl/user-created.event";
import { Logger } from "@nestjs/common";
import { UserDto } from "users/dtos/users.dto";
import { getMongoRepository } from "typeorm";
import { Utils } from "utils";

@EventsHandler(UserCreationStartedEvent)
export class UserCreationStartedHandler
  implements IEventHandler<UserCreationStartedEvent> {
  handle(event: UserCreationStartedEvent) {
    Logger.log(event, "UserCreationStartedEvent");
  }
}

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor() {}

  async handle(event: UserCreatedEvent) {
    try {
      Logger.log(event, "UserCreatedEvent");
      const user = event.userDto;
      const transactionId = event.transactionId;
      user.password = Utils.hashPassword(user.password);
      user.roles = Utils.updateUserRoles(user.roles);
      user.transactionId = transactionId;
      return await getMongoRepository(UserDto).save(user);
    } catch (error) {
      Logger.error(error, "", "UserCreatedEvent");
    }
  }
}

@EventsHandler(UserCreatedFailEvent)
export class UserCreatedFailHandler
  implements IEventHandler<UserCreatedFailEvent> {
  handle(event: UserCreatedFailEvent) {
    Logger.log(event, "UserCreatedFailEvent");
  }
}
