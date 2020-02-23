import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserCreationStartedEvent } from "../impl/user-creation-started.event";
import { Logger } from "@nestjs/common";

@EventsHandler(UserCreationStartedEvent)
export class UserCreationStartedHandler
  implements IEventHandler<UserCreationStartedEvent> {
  handle(event: UserCreationStartedEvent) {
    Logger.log(event, "UserCreationStartedEvent");
    const user = event.userDto[0];
    // user._id = Utils.getUuid();
    return user;
  }
}
