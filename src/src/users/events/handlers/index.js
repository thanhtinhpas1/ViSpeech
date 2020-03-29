"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_deleted_handler_1 = require("./user-deleted.handler");
const user_updated_handler_1 = require("./user-updated.handler");
const user_created_handler_1 = require("./user-created.handler");
const user_welcomed_handler_1 = require("./user-welcomed.handler");
const password_changed_handler_1 = require("./password-changed.handler");
const verify_email_sent_handler_1 = require("./verify-email-sent.handler");
const email_verified_handler_1 = require("./email-verified.handler");
exports.EventHandlers = [
    user_created_handler_1.UserCreationStartedHandler,
    user_created_handler_1.UserCreatedSuccessHandler,
    user_created_handler_1.UserCreatedFailHandler,
    user_created_handler_1.UserCreatedHandler,
    user_updated_handler_1.UserUpdatedHandler,
    user_updated_handler_1.UserUpdatedSuccessHandler,
    user_updated_handler_1.UserUpdatedFailedHandler,
    password_changed_handler_1.PasswordChangedHandler,
    user_deleted_handler_1.UserDeletedHandler,
    user_deleted_handler_1.UserDeletedSuccessHandler,
    user_deleted_handler_1.UserDeletedFailedHandler,
    user_welcomed_handler_1.UserWelcomedHandler,
    verify_email_sent_handler_1.VerifyEmailSentHandler,
    verify_email_sent_handler_1.VerifyEmailSentSuccessHandler,
    verify_email_sent_handler_1.VerifyEmailSentFailedHandler,
    email_verified_handler_1.EmailVerifiedHandler
];
//# sourceMappingURL=index.js.map