import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PermissionWelcomedEvent } from "../impl/permission-welcomed.event";

@EventsHandler(PermissionWelcomedEvent)
export class PermissionWelcomedHandler implements IEventHandler<PermissionWelcomedEvent> {
  handle(event: PermissionWelcomedEvent) {
    Logger.log(event.permissionId, "PermissionWelcomedEvent"); // write here
  }
}
