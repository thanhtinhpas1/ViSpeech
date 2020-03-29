"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permission_created_handler_1 = require("./permission-created.handler");
const permission_updated_handler_1 = require("./permission-updated.handler");
const permission_deleted_handler_1 = require("./permission-deleted.handler");
const permission_welcomed_handler_1 = require("./permission-welcomed.handler");
const permission_assign_email_sent_handler_1 = require("./permission-assign-email-sent.handler");
const permission_assign_replied_handler_1 = require("./permission-assign-replied.handler");
exports.EventHandlers = [
    permission_created_handler_1.PermissionCreatedHandler,
    permission_created_handler_1.PermissionCreatedSuccessHandler,
    permission_created_handler_1.PermissionCreatedFailedHandler,
    permission_updated_handler_1.PermissionUpdatedHandler,
    permission_deleted_handler_1.PermissionDeletedHandler,
    permission_welcomed_handler_1.PermissionWelcomedHandler,
    permission_assign_email_sent_handler_1.PermissionAssignEmailSentHandler,
    permission_assign_email_sent_handler_1.PermissionAssignEmailSentSuccessHandler,
    permission_assign_email_sent_handler_1.PermissionAssignEmailSentFailedHandler,
    permission_assign_replied_handler_1.PermissionAssignRepliedHandler,
];
//# sourceMappingURL=index.js.map