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
import { PermissionDeletedByUserIdHandler, PermissionDeletedByUserIdSuccessHandler, PermissionDeletedByUserIdFailedHandler } from './permission-deleted-by-userId.handler';
import { PermissionDeletedByProjectIdHandler, PermissionDeletedByProjectIdSuccessHandler, PermissionDeletedByProjectIdFailedHandler } from './permission-deleted-by-projectId.handler';

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

    // delete by userId
    PermissionDeletedByUserIdHandler,
    PermissionDeletedByUserIdSuccessHandler,
    PermissionDeletedByUserIdFailedHandler,

    // delete by projectId
    PermissionDeletedByProjectIdHandler,
    PermissionDeletedByProjectIdSuccessHandler,
    PermissionDeletedByProjectIdFailedHandler,

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
