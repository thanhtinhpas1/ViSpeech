import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserCreationStartedEvent } from "../impl/user-creation-started.event";
import { Logger } from "@nestjs/common";
import { Utils } from "utils";

@EventsHandler(UserCreationStartedEvent)
export class UserCreationStartedHandler
  implements IEventHandler<UserCreationStartedEvent> {
  handle(event: UserCreationStartedEvent) {
    Logger.log(event, "UserCreationStartedEvent");
    const user = event.userDto[0];
    user.id = Utils.getUuid();
    return user;
  }
}
