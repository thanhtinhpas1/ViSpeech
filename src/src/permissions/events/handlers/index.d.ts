import { PermissionCreatedHandler, PermissionCreatedSuccessHandler } from './permission-created.handler';
import { PermissionUpdatedHandler } from './permission-updated.handler';
import { PermissionDeletedHandler } from './permission-deleted.handler';
import { PermissionWelcomedHandler } from './permission-welcomed.handler';
import { PermissionAssignEmailSentHandler, PermissionAssignEmailSentSuccessHandler } from './permission-assign-email-sent.handler';
import { PermissionAssignRepliedHandler } from './permission-assign-replied.handler';
export declare const EventHandlers: (typeof PermissionCreatedHandler | typeof PermissionCreatedSuccessHandler | typeof PermissionUpdatedHandler | typeof PermissionDeletedHandler | typeof PermissionWelcomedHandler | typeof PermissionAssignEmailSentHandler | typeof PermissionAssignEmailSentSuccessHandler | typeof PermissionAssignRepliedHandler)[];
