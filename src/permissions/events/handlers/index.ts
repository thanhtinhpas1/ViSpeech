import {PermissionCreatedFailedHandler, PermissionCreatedHandler, PermissionCreatedSuccessHandler} from './permission-created.handler';
import {PermissionUpdatedHandler, PermissionUpdatedSuccessHandler, PermissionUpdatedFailedHandler} from './permission-updated.handler';
import {PermissionDeletedHandler, PermissionDeletedSuccessHandler, PermissionDeletedFailedHandler} from './permission-deleted.handler';
import {PermissionWelcomedHandler} from './permission-welcomed.handler';
import {
    PermissionAssignEmailSentFailedHandler,
    PermissionAssignEmailSentHandler,
    PermissionAssignEmailSentSuccessHandler
} from './permission-assign-email-sent.handler';
import {PermissionAssignRepliedHandler, PermissionAssignRepliedSuccessHandler, PermissionAssignRepliedFailedHandler} from './permission-assign-replied.handler';

export const EventHandlers = [
    // create
    PermissionCreatedHandler,
    PermissionCreatedSuccessHandler,
    PermissionCreatedFailedHandler,

    // update
    PermissionUpdatedHandler,
    PermissionUpdatedSuccessHandler,
    PermissionUpdatedFailedHandler,

    // delete
    PermissionDeletedHandler,
    PermissionDeletedSuccessHandler,
    PermissionDeletedFailedHandler,

    PermissionWelcomedHandler,

    // send email assign permisison
    PermissionAssignEmailSentHandler,
    PermissionAssignEmailSentSuccessHandler,
    PermissionAssignEmailSentFailedHandler,

    // reply permission assign
    PermissionAssignRepliedHandler,
    PermissionAssignRepliedSuccessHandler,
    PermissionAssignRepliedFailedHandler,
];
