import { UserDeletedFailedHandler, UserDeletedHandler, UserDeletedSuccessHandler } from "./user-deleted.handler";
import { UserUpdatedFailedHandler, UserUpdatedHandler, UserUpdatedSuccessHandler } from "./user-updated.handler";
import {
    UserCreatedFailHandler,
    UserCreatedHandler,
    UserCreatedSuccessHandler,
    UserCreationStartedHandler
} from "./user-created.handler";
import {UserWelcomedHandler} from "./user-welcomed.handler";
import {PasswordChangedHandler} from './password-changed.handler';
import { VerifyEmailSentHandler, VerifyEmailSentSuccessHandler, VerifyEmailSentFailedHandler } from "./verify-email-sent.handler";
import { EmailVerifiedHandler } from "./email-verified.handler";

export const EventHandlers = [
    // create
    UserCreationStartedHandler,
    UserCreatedSuccessHandler,
    UserCreatedFailHandler,
    UserCreatedHandler,

    // update
    UserUpdatedHandler,
    UserUpdatedSuccessHandler,
    UserUpdatedFailedHandler,

    // change password
    PasswordChangedHandler,

    // delete
    UserDeletedHandler,
    UserDeletedSuccessHandler,
    UserDeletedFailedHandler,

    // welcome
    UserWelcomedHandler,

    // send verify email
    VerifyEmailSentHandler,
    VerifyEmailSentSuccessHandler,
    VerifyEmailSentFailedHandler,

    // verify email
    EmailVerifiedHandler
];
