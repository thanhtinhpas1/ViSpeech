import { UserUpdatedHandler } from "./user-updated.handler";
import { UserDeletedHandler } from "./user-deleted.handler";
import { UserCreationStartedHandler, UserCreatedFailHandler, UserTokenCreatedHandler, UserTokenCreatedFailHandler } from "./user-created.handler";
import { UserWelcomedHandler } from "./user-welcomed.handler";
import { UserCreatedHandler } from "./user-created.handler";

export const EventHandlers = [
  UserCreationStartedHandler,
  UserCreatedFailHandler,
  UserCreatedHandler,
  UserTokenCreatedHandler,
  UserTokenCreatedFailHandler,
  UserUpdatedHandler,
  UserDeletedHandler,
  UserWelcomedHandler
];
