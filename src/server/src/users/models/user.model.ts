import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/impl/user-created.event';
import { UserDeletedEvent } from '../events/impl/user-deleted.event';
import { UserUpdatedEvent } from '../events/impl/user-updated.event';
import { PasswordChangedEvent } from '../events/impl/password-changed.event';
import { UserWelcomedEvent } from 'users/events/impl/user-welcomed.event';
import { VerifyEmailSentEvent } from 'users/events/impl/verify-email-sent.event';
import { EmailVerifiedEvent } from 'users/events/impl/email-verified.event';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { ResetPasswordEmailSentEvent } from 'users/events/impl/reset-password-email-sent.event';
import { PasswordResetEvent } from 'users/events/impl/password-reset.event';

export class User extends AggregateRoot {
    [x: string]: any;

    constructor(private readonly id: string | undefined) {
        super();
    }

    setData(data) {
        this.data = data;
    }

    createUser(streamId: string, freeToken: TokenDto) {
        this.apply(new UserCreatedEvent(streamId, this.data, freeToken));
    }

    updateUser(streamId: string) {
        this.apply(new UserUpdatedEvent(streamId, this.data));
    }

    deleteUser(streamId: string, isDeleted: string) {
        this.apply(new UserDeletedEvent(streamId, this.id, isDeleted));
    }

    changePassword(streamId: string) {
        this.apply(new PasswordChangedEvent(streamId, this.data));
    }

    sendVerifyEmail(streamId: string) {
        this.apply(new VerifyEmailSentEvent(streamId, this.id));
    }

    verifyEmail(streamId: string) {
        this.apply(new EmailVerifiedEvent(streamId, this.data));
    }

    sendResetPasswordEmail(streamId: string) {
        this.apply(new ResetPasswordEmailSentEvent(streamId, this.data));
    }

    resetPassword(streamId: string) {
        this.apply(new PasswordResetEvent(streamId, this.data));
    }

    welcomeUser(streamId: string) {
        this.apply(new UserWelcomedEvent(streamId, this.id));
    }
}
