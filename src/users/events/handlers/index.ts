import { UserDeletedFailedHandler, UserDeletedHandler, UserDeletedSuccessHandler } from "./user-deleted.handler";
import { UserUpdatedFailedHandler, UserUpdatedHandler, UserUpdatedSuccessHandler } from "./user-updated.handler";
import {
    UserCreatedFailHandler,
    UserCreatedHandler,
    UserCreatedSuccessHandler,
    UserCreationStartedHandler
} from "./user-created.handler";
import { UserWelcomedHandler } from "./user-welcomed.handler";
import { UserRoleAssignedHandler, UserRoleAssignedSuccessHandler, UserRoleAssignedFailedHandler } from "./user-role-assigned.handler";

export const EventHandlers = [
    // create
    UserCreationStartedHandler,
    UserCreatedSuccessHandler,
    UserCreatedFailHandler,
    UserCreatedHandler,
    UserCreatedHandler,

    // update
    UserUpdatedHandler,
    UserUpdatedSuccessHandler,
    UserUpdatedFailedHandler,

    // assign user role
    UserRoleAssignedHandler,
    UserRoleAssignedSuccessHandler,
    UserRoleAssignedFailedHandler,

    // delete
    UserDeletedHandler,
    UserDeletedSuccessHandler,
    UserDeletedFailedHandler,

    // welcome
    UserWelcomedHandler,
];
