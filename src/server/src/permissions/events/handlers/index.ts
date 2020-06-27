import {
    PermissionCreatedFailedHandler,
    PermissionCreatedHandler,
    PermissionCreatedSuccessHandler
} from './permission-created.handler';
import {
    PermissionUpdatedFailedHandler,
    PermissionUpdatedHandler,
    PermissionUpdatedSuccessHandler
} from './permission-updated.handler';
import {
    PermissionDeletedFailedHandler,
    PermissionDeletedHandler,
    PermissionDeletedSuccessHandler
} from './permission-deleted.handler';
import { PermissionWelcomedHandler } from './permission-welcomed.handler';
import {
    PermissionAssignEmailSentFailedHandler,
    PermissionAssignEmailSentHandler,
    PermissionAssignEmailSentSuccessHandler
} from './permission-assign-email-sent.handler';
import {
    PermissionAssignRepliedFailedHandler,
    PermissionAssignRepliedHandler,
    PermissionAssignRepliedSuccessHandler
} from './permission-assign-replied.handler';
import {
    PermissionDeletedByUserIdFailedHandler,
    PermissionDeletedByUserIdHandler,
    PermissionDeletedByUserIdSuccessHandler
} from './permission-deleted-by-userId.handler';
import {
    PermissionDeletedByProjectIdFailedHandler,
    PermissionDeletedByProjectIdHandler,
    PermissionDeletedByProjectIdSuccessHandler
} from './permission-deleted-by-projectId.handler';

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

    // send email assign permissison
    PermissionAssignEmailSentHandler,
    PermissionAssignEmailSentSuccessHandler,
    PermissionAssignEmailSentFailedHandler,

    // reply permission assign
    PermissionAssignRepliedHandler,
    PermissionAssignRepliedSuccessHandler,
    PermissionAssignRepliedFailedHandler,
];
