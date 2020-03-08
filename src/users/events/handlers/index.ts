import { AssignedRoleHandler } from "./assigned-role.handler";
import { UserDeletedHandler } from "./user-deleted.handler";
import { UserUpdatedHandler } from "./user-updated.handler";
import { UserCreationStartedHandler, UserCreatedFailHandler, UserCreatedHandler, UserCreatedSuccessHandler } from "./user-created.handler";
import { UserWelcomedHandler } from "./user-welcomed.handler";

export const EventHandlers = [
  UserCreationStartedHandler,
  UserCreatedSuccessHandler,
  UserCreatedFailHandler,
  UserCreatedHandler,
  UserUpdatedHandler,
  UserDeletedHandler,
  UserWelcomedHandler,
  AssignedRoleHandler
];
