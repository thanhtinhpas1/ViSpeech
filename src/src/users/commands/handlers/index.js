"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_user_handler_1 = require("./create-user.handler");
const delete_user_handler_1 = require("./delete-user.handler");
const update_user_handler_1 = require("./update-user.handler");
const welcome_user_handler_1 = require("./welcome-user.handler");
const change_password_handler_1 = require("./change-password.handler");
const send_verify_email_handler_1 = require("./send-verify-email.handler");
const verify_email_handler_1 = require("./verify-email.handler");
exports.CommandHandlers = [
    create_user_handler_1.CreateUserStartHandler,
    create_user_handler_1.CreateUserHandler,
    delete_user_handler_1.DeleteUserHandler,
    update_user_handler_1.UpdateUserHandler,
    welcome_user_handler_1.WelcomeUserHandler,
    change_password_handler_1.ChangePasswordHandler,
    send_verify_email_handler_1.SendVerifyEmailHandler,
    verify_email_handler_1.VerifyEmailHandler,
];
//# sourceMappingURL=index.js.map