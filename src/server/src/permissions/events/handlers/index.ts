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
import {
    PermissionAssigneeTokensUpdatedHandler,
    PermissionAssigneeTokensUpdatedSuccessHandler,
    PermissionAssigneeTokensUpdatedFailedHandler
} from './permission-assignee-tokens-updated.handler';
import {
    PermissionForAssigneeDeletedHandler,
    PermissionForAssigneeDeletedSuccessHandler,
    PermissionForAssigneeDeletedFailedHandler
} from './permission-for-assignee-deleted.handler';
import {
    PermissionExpirationDateUpdatedHandler,
    PermissionExpirationDateUpdatedSuccessHandler,
    PermissionExpirationDateUpdatedFailedHandler
} from './permission-expiration-date-updated.handler';

export const EventHandlers = [
    // create
    PermissionCreatedHandler,
    PermissionCreatedSuccessHandler,
    PermissionCreatedFailedHandler,

    // update
    PermissionUpdatedHandler,
    PermissionUpdatedSuccessHandler,
    PermissionUpdatedFailedHandler,

    // update permission expiration date
    PermissionExpirationDateUpdatedHandler,
    PermissionExpirationDateUpdatedSuccessHandler,
    PermissionExpirationDateUpdatedFailedHandler,

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

    // delete permission for assignee
    PermissionForAssigneeDeletedHandler,
    PermissionForAssigneeDeletedSuccessHandler,
    PermissionForAssigneeDeletedFailedHandler,

    PermissionWelcomedHandler,

    // send email assign permission
    PermissionAssignEmailSentHandler,
    PermissionAssignEmailSentSuccessHandler,
    PermissionAssignEmailSentFailedHandler,

    // reply permission assign
    PermissionAssignRepliedHandler,
    PermissionAssignRepliedSuccessHandler,
    PermissionAssignRepliedFailedHandler,

    // update assignee tokens in permission
    PermissionAssigneeTokensUpdatedHandler,
    PermissionAssigneeTokensUpdatedSuccessHandler,
    PermissionAssigneeTokensUpdatedFailedHandler
];
