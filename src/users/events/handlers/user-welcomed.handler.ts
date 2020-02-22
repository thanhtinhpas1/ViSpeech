import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserWelcomedEvent } from "../impl/user-welcomed.event";
import { Logger } from "@nestjs/common";

@EventsHandler(UserWelcomedEvent)
export class UserWelcomedHandler implements IEventHandler<UserWelcomedEvent> {
  async handle(event: UserWelcomedEvent) {
    Logger.log(event.userId, "UserWelcomedEvent");
  }
}
