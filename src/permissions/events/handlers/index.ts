import {PermissionCreatedFailedHandler, PermissionCreatedHandler, PermissionCreatedSuccessHandler} from './permission-created.handler';
import {PermissionUpdatedHandler} from './permission-updated.handler';
import {PermissionDeletedHandler} from './permission-deleted.handler';
import {PermissionWelcomedHandler} from './permission-welcomed.handler';
import {
    PermissionAssignEmailSentFailedHandler,
    PermissionAssignEmailSentHandler,
    PermissionAssignEmailSentSuccessHandler
} from './permission-assign-email-sent.handler';
import {PermissionAssignRepliedHandler} from './permission-assign-replied.handler';

export const EventHandlers = [
    // create
    PermissionCreatedHandler,
    PermissionCreatedSuccessHandler,
    PermissionCreatedFailedHandler,

    PermissionUpdatedHandler,
    PermissionDeletedHandler,
    PermissionWelcomedHandler,

    // send email assign permisison
    PermissionAssignEmailSentHandler,
    PermissionAssignEmailSentSuccessHandler,
    PermissionAssignEmailSentFailedHandler,

    // reply permission assign
    PermissionAssignRepliedHandler,
];
