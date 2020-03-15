import { UserDeletedFailedHandler, UserDeletedHandler, UserDeletedSuccessHandler } from "./user-deleted.handler";
import { UserUpdatedFailedHandler, UserUpdatedHandler, UserUpdatedSuccessHandler } from "./user-updated.handler";
import {
    UserCreatedFailHandler,
    UserCreatedHandler,
    UserCreatedSuccessHandler,
    UserCreationStartedHandler
} from "./user-created.handler";
import {UserWelcomedHandler} from "./user-welcomed.handler";
import {UserRoleAssignedHandler} from "./user-role-assigned.handler";
import {ChangedPasswordHandler} from './changed-password.handler';

export const EventHandlers = [
    // create
    UserCreationStartedHandler,
    UserCreatedSuccessHandler,
    UserCreatedFailHandler,
    UserCreatedHandler,

    // update
    UserUpdatedHandler,
    UserUpdatedSuccessHandler,
    UserUpdatedFailedHandler,
    UserRoleAssignedHandler,
    ChangedPasswordHandler,

    // delete
    UserDeletedHandler,
    UserDeletedSuccessHandler,
    UserDeletedFailedHandler,

    // welcome
    UserWelcomedHandler,
];
