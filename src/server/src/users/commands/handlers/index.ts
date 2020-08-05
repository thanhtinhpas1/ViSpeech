import { CreateUserHandler } from './create-user.handler';
import { DeleteUserHandler } from './delete-user.handler';
import { UpdateUserHandler } from './update-user.handler';
import { WelcomeUserHandler } from './welcome-user.handler';
import { ChangePasswordHandler } from './change-password.handler';
import { SendVerifyEmailHandler } from './send-verify-email.handler';
import { VerifyEmailHandler } from './verify-email.handler';
import { SendResetPasswordEmailHandler } from './send-reset-password-email.handler';
import { ResetPasswordHandler } from './reset-password.handler';

export const CommandHandlers = [
    CreateUserHandler,
    DeleteUserHandler,
    UpdateUserHandler,
    WelcomeUserHandler,
    ChangePasswordHandler,
    SendVerifyEmailHandler,
    VerifyEmailHandler,
    SendResetPasswordEmailHandler,
    ResetPasswordHandler
];
