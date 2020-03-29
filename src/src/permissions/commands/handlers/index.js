"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_permission_handler_1 = require("./create-permission.handler");
const delete_permission_handler_1 = require("./delete-permission.handler");
const update_permission_handler_1 = require("./update-permission.handler");
const welcome_permission_handler_1 = require("./welcome-permission.handler");
const send_assign_permission_email_handler_1 = require("./send-assign-permission-email.handler");
const reply_permission_assign_handler_1 = require("./reply-permission-assign.handler");
exports.CommandHandlers = [
    create_permission_handler_1.CreatePermissionHandler,
    delete_permission_handler_1.DeletePermissionHandler,
    update_permission_handler_1.UpdatePermissionHandler,
    welcome_permission_handler_1.WelcomePermissionHandler,
    send_assign_permission_email_handler_1.SendAssignPermissionEmailHandler,
    reply_permission_assign_handler_1.ReplyPermissionAssignHandler,
];
//# sourceMappingURL=index.js.map