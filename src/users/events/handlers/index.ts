import { AssignedRoleHandler } from "./assigned-role.handler";
import { UserCreatedFailHandler, UserCreatedHandler, UserCreationStartedHandler } from "./user-created.handler";
import { UserDeletedHandler } from "./user-deleted.handler";
import { UserUpdatedHandler } from "./user-updated.handler";
import { UserWelcomedHandler } from "./user-welcomed.handler";

export const EventHandlers = [
  UserCreationStartedHandler,
  UserCreatedFailHandler,
  UserCreatedHandler,
  UserUpdatedHandler,
  UserDeletedHandler,
  UserWelcomedHandler,
  AssignedRoleHandler
];
