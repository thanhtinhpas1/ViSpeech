import { UserUpdatedHandler } from "./user-updated.handler";
import { UserDeletedHandler } from "./user-deleted.handler";
import { UserCreationStartedHandler, UserCreatedFailHandler, UserCreatedHandler } from "./user-created.handler";
import { UserWelcomedHandler } from "./user-welcomed.handler";

export const EventHandlers = [
  UserCreationStartedHandler,
  UserCreatedFailHandler,
  UserCreatedHandler,
  UserUpdatedHandler,
  UserDeletedHandler,
  UserWelcomedHandler
];
