import { UserRoleAssignedHandler } from "./user-role-assigned.handler"
import { UserDeletedHandler, UserDeletedSuccessHandler, UserDeletedFailedHandler } from "./user-deleted.handler";
import { UserUpdatedHandler, UserUpdatedFailedHandler, UserUpdatedSuccessHandler } from "./user-updated.handler";
import { UserCreationStartedHandler, UserCreatedFailedHandler, UserCreatedHandler, UserCreatedSuccessHandler } from "./user-created.handler";
import { UserWelcomedHandler } from "./user-welcomed.handler";

export const EventHandlers = [
  // create
  UserCreationStartedHandler,
  UserCreatedSuccessHandler,
  UserCreatedFailedHandler,
  UserCreatedHandler,

  // update
  UserUpdatedHandler,
  UserUpdatedSuccessHandler,
  UserUpdatedFailedHandler,

  // delete
  UserDeletedHandler,
  UserDeletedSuccessHandler,
  UserDeletedFailedHandler,

  UserWelcomedHandler,
  UserRoleAssignedHandler
];
