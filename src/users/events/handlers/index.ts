import { UserCreatedHandler } from "./user-created.handler";
import { UserUpdatedHandler } from "./user-updated.handler";
import { UserDeletedHandler } from "./user-deleted.handler";
import { UserCreationStartedHandler } from "./user-creation-started.handler";
import { UserWelcomedHandler } from "./user-welcomed.handler";

export const EventHandlers = [
  UserCreationStartedHandler,
  UserCreatedHandler,
  UserUpdatedHandler,
  UserDeletedHandler,
  UserWelcomedHandler
];
