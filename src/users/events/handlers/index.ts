import { UserDeletedFailedHandler, UserDeletedHandler, UserDeletedSuccessHandler } from "./user-deleted.handler";
import { UserUpdatedFailedHandler, UserUpdatedHandler, UserUpdatedSuccessHandler } from "./user-updated.handler";
import {
    UserCreatedFailHandler,
    UserCreatedHandler,
    UserCreatedSuccessHandler,
    UserCreationStartedHandler
} from "./user-created.handler";
import {UserWelcomedHandler} from "./user-welcomed.handler";
import {UserRoleAssignedHandler, UserRoleAssignedSuccessHandler, UserRoleAssignedFailedHandler} from "./user-role-assigned.handler";
import {PasswordChangedHandler} from './password-changed.handler';

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

    // change password
    PasswordChangedHandler,

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
