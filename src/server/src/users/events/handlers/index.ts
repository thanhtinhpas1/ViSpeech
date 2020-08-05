import { UserDeletedFailedHandler, UserDeletedHandler, UserDeletedSuccessHandler } from './user-deleted.handler';
import { UserUpdatedFailedHandler, UserUpdatedHandler, UserUpdatedSuccessHandler } from './user-updated.handler';
import { UserCreatedFailedHandler, UserCreatedHandler, UserCreatedSuccessHandler, } from './user-created.handler';
import { UserWelcomedHandler } from './user-welcomed.handler';
import {
    PasswordChangedFailedHandler,
    PasswordChangedHandler,
    PasswordChangedSuccessHandler
} from './password-changed.handler';
import {
    VerifyEmailSentFailedHandler,
    VerifyEmailSentHandler,
    VerifyEmailSentSuccessHandler
} from './verify-email-sent.handler';
import {
    EmailVerifiedFailedHandler,
    EmailVerifiedHandler,
    EmailVerifiedSuccessHandler
} from './email-verified.handler';
import {
    ResetPasswordEmailSentHandler,
    ResetPasswordEmailSentSuccessHandler,
    ResetPasswordEmailSentFailedHandler
} from './reset-password-email-sent.handler';
import { PasswordResetHandler, PasswordResetSuccessHandler, PasswordResetFailedHandler } from './password-reset.handler';

export const EventHandlers = [
    // create
    UserCreatedHandler,
    UserCreatedSuccessHandler,
    UserCreatedFailedHandler,

    // update
    UserUpdatedHandler,
    UserUpdatedSuccessHandler,
    UserUpdatedFailedHandler,

    // change password
    PasswordChangedHandler,
    PasswordChangedSuccessHandler,
    PasswordChangedFailedHandler,

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
    EmailVerifiedHandler,
    EmailVerifiedSuccessHandler,
    EmailVerifiedFailedHandler,

    // send reset password email
    ResetPasswordEmailSentHandler,
    ResetPasswordEmailSentSuccessHandler,
    ResetPasswordEmailSentFailedHandler,

    // reset password
    PasswordResetHandler,
    PasswordResetSuccessHandler,
    PasswordResetFailedHandler,
];
