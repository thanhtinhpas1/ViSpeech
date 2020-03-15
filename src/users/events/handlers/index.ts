import {UserDeletedFailedHandler, UserDeletedHandler, UserDeletedSuccessHandler} from "./user-deleted.handler";
import {UserUpdatedFailedHandler, UserUpdatedHandler, UserUpdatedSuccessHandler} from "./user-updated.handler";
import {
    UserCreatedFailHandler,
    UserCreatedHandler,
    UserCreatedSuccessHandler,
    UserCreationStartedHandler
} from "./user-created.handler";
import {UserWelcomedHandler} from "./user-welcomed.handler";
import {AssignedRoleHandler} from "./user-role-assigned.handler";
import {ChangedPasswordHandler} from './changed-password.handler';

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
    AssignedRoleHandler,
    ChangedPasswordHandler,

    // delete
    UserDeletedHandler,
    UserDeletedSuccessHandler,
    UserDeletedFailedHandler,
    UserWelcomedHandler,

];
