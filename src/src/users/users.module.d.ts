import { OnModuleInit } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { EventStore } from '../core/event-store/event-store';
import { UserDto } from './dtos/users.dto';
import { PasswordChangedEvent } from './events/impl/password-changed.event';
import { UserCreatedEvent, UserCreatedFailedEvent, UserCreatedSuccessEvent, UserCreationStartedEvent } from './events/impl/user-created.event';
import { UserDeletedEvent, UserDeletedFailedEvent, UserDeletedSuccessEvent } from './events/impl/user-deleted.event';
import { UserUpdatedEvent, UserUpdatedFailedEvent, UserUpdatedSuccessEvent } from './events/impl/user-updated.event';
import { UserWelcomedEvent } from './events/impl/user-welcomed.event';
import { VerifyEmailSentEvent, VerifyEmailSentFailedEvent, VerifyEmailSentSuccessEvent } from './events/impl/verify-email-sent.event';
import { EmailVerifiedEvent } from './events/impl/email-verified.event';
export declare class UsersModule implements OnModuleInit {
    private readonly command$;
    private readonly query$;
    private readonly event$;
    private readonly eventStore;
    private readonly repository;
    constructor(command$: CommandBus, query$: QueryBus, event$: EventBus, eventStore: EventStore, repository: Repository<UserDto>);
    onModuleInit(): Promise<void>;
    eventHandlers: {
        UserCreationStartedEvent: (streamId: any, data: any) => UserCreationStartedEvent;
        UserCreatedEvent: (streamId: any, data: any) => UserCreatedEvent;
        UserCreatedSuccessEvent: (streamId: any, data: any) => UserCreatedSuccessEvent;
        UserCreatedFailedEvent: (streamId: any, data: any, error: any) => UserCreatedFailedEvent;
        UserUpdatedEvent: (streamId: any, data: any) => UserUpdatedEvent;
        UserUpdatedSuccessEvent: (streamId: any, data: any) => UserUpdatedSuccessEvent;
        UserUpdatedFailedEvent: (streamId: any, data: any, error: any) => UserUpdatedFailedEvent;
        PasswordChangedEvent: (streamId: any, userId: any, newPassword: any, oldPassword: any) => PasswordChangedEvent;
        UserDeletedEvent: (streamId: any, data: any) => UserDeletedEvent;
        UserDeletedSuccessEvent: (streamId: any, data: any) => UserDeletedSuccessEvent;
        UserDeletedFailedEvent: (streamId: any, data: any, error: any) => UserDeletedFailedEvent;
        UserWelcomedEvent: (streamId: any, data: any) => UserWelcomedEvent;
        VerifyEmailSentEvent: (streamId: any, data: any) => VerifyEmailSentEvent;
        VerifyEmailSentSuccessEvent: (streamId: any, data: any) => VerifyEmailSentSuccessEvent;
        VerifyEmailSentFailedEvent: (streamId: any, data: any, error: any) => VerifyEmailSentFailedEvent;
        EmailVerifiedEvent: (streamId: any, data: any) => EmailVerifiedEvent;
    };
}
