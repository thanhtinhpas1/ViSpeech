import { UserDeletedHandler, UserDeletedSuccessHandler } from './user-deleted.handler';
import { UserUpdatedHandler, UserUpdatedSuccessHandler } from './user-updated.handler';
import { UserCreatedHandler } from './user-created.handler';
import { PasswordChangedHandler } from './password-changed.handler';
import { VerifyEmailSentHandler } from './verify-email-sent.handler';
import { EmailVerifiedHandler } from './email-verified.handler';
export declare const EventHandlers: (typeof UserDeletedHandler | typeof UserDeletedSuccessHandler | typeof UserUpdatedHandler | typeof UserUpdatedSuccessHandler | typeof UserCreatedHandler | typeof PasswordChangedHandler | typeof VerifyEmailSentHandler | typeof EmailVerifiedHandler)[];
