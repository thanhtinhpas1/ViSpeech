import {forwardRef, Logger, Module, OnModuleInit} from '@nestjs/common';
import {CommandBus, EventBus, EventPublisher, QueryBus} from '@nestjs/cqrs';
import {InjectRepository, TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from 'auth/auth.module';
import {EventStoreModule} from 'core/event-store/event-store.module';
import {CommandHandlers as TokenCommandHandlers} from 'tokens/commands/handlers';
import {TokenRepository} from 'tokens/repository/token.repository';
import {TokensModule} from 'tokens/tokens.module';
import {Repository} from 'typeorm';
import {CONSTANTS} from '../common/constant';
import {EventStore} from '../core/event-store/event-store';
import {RoleDto} from '../roles/dtos/roles.dto';
import {Utils} from '../utils';
import {CommandHandlers} from './commands/handlers';
import {UsersController} from './controllers/users.controller';
import {UserDto} from './dtos/users.dto';
import {EventHandlers} from './events/handlers';
import {PasswordChangedEvent, PasswordChangedSuccessEvent, PasswordChangedFailedEvent} from './events/impl/password-changed.event';
import {UserCreatedEvent, UserCreatedFailedEvent, UserCreatedSuccessEvent, UserCreationStartedEvent} from './events/impl/user-created.event';
import {UserDeletedEvent, UserDeletedFailedEvent, UserDeletedSuccessEvent} from './events/impl/user-deleted.event';
import {UserUpdatedEvent, UserUpdatedFailedEvent, UserUpdatedSuccessEvent} from './events/impl/user-updated.event';
import {UserWelcomedEvent} from './events/impl/user-welcomed.event';
import {QueryHandlers} from './queries/handler';
import {UserRepository} from './repository/user.repository';
import {UsersSagas} from './sagas/users.sagas';
import {UsersService} from './services/users.service';
import {VerifyEmailSentEvent, VerifyEmailSentFailedEvent, VerifyEmailSentSuccessEvent} from './events/impl/verify-email-sent.event';
import {EmailVerifiedEvent} from './events/impl/email-verified.event';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserDto]),
        forwardRef(() => AuthModule),
        EventStoreModule.forFeature(),
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersSagas, ...CommandHandlers, ...TokenCommandHandlers,
        ...EventHandlers, ...QueryHandlers,
        /*** REPOSITORY */
        UserRepository, TokenRepository,
        QueryBus, EventBus, EventStore, CommandBus, EventPublisher,
    ],
    exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
    constructor(
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus,
        private readonly eventStore: EventStore,
        @InjectRepository(UserDto)
        private readonly repository: Repository<UserDto>,
    ) {
    }

    async onModuleInit() {
        this.eventStore.setEventHandlers({
            ...this.eventHandlers,
            ...TokensModule.eventHandlers,
        });
        await this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
        this.event$.publisher = this.eventStore;
        this.event$.register(EventHandlers);
        this.command$.register([...CommandHandlers, ...TokenCommandHandlers]);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([UsersSagas]);
        // seed data
        try {
            const admin = new UserDto('admin', 'admin', 'admin', Utils.hashPassword('admin'),
                'admin@vispeech.com', [new RoleDto(CONSTANTS.ROLE.ADMIN)]);
            Logger.log('Seed admin account success', 'UserModule');
            await this.repository.save(admin);
        } catch (e) {
            Logger.warn('Seed admin account existed', 'UserModule');
        }
    }

    eventHandlers = {
        // create
        UserCreationStartedEvent: (streamId, data) => new UserCreationStartedEvent(streamId, data),
        UserCreatedEvent: (streamId, data) => new UserCreatedEvent(streamId, data),
        UserCreatedSuccessEvent: (streamId, data) => new UserCreatedSuccessEvent(streamId, data),
        UserCreatedFailedEvent: (streamId, data, error) => new UserCreatedFailedEvent(streamId, data, error),

        // update
        UserUpdatedEvent: (streamId, data) => new UserUpdatedEvent(streamId, data),
        UserUpdatedSuccessEvent: (streamId, data) => new UserUpdatedSuccessEvent(streamId, data),
        UserUpdatedFailedEvent: (streamId, data, error) => new UserUpdatedFailedEvent(streamId, data, error),

        // change password
        PasswordChangedEvent: (streamId, data) => new PasswordChangedEvent(streamId, data),
        PasswordChangedSuccessEvent: (streamId, data) => new PasswordChangedSuccessEvent(streamId, data),
        PasswordChangedFailedEvent: (streamId, data, error) => new PasswordChangedFailedEvent(streamId, data, error),

        // delete
        UserDeletedEvent: (streamId, data) => new UserDeletedEvent(streamId, data),
        UserDeletedSuccessEvent: (streamId, data) => new UserDeletedSuccessEvent(streamId, data),
        UserDeletedFailedEvent: (streamId, data, error) => new UserDeletedFailedEvent(streamId, data, error),

        // assign user role
        // UserRoleAssignedEvent: (streamId, userId, roleNames, assignerId) => new UserRoleAssignedEvent(streamId, userId, roleNames, assignerId),
        // UserRoleAssignedSuccessEvent: (streamId, userId, roleNames, assignerId) => new UserRoleAssignedSuccessEvent(streamId, userId, roleNames, assignerId),
        // UserRoleAssignedFailedEvent: (streamId, userId, roleNames, assignerId, error) => new UserRoleAssignedFailedEvent(streamId, userId, roleNames, assignerId, error),

        UserWelcomedEvent: (streamId, data) => new UserWelcomedEvent(streamId, data),

        // send verify email
        VerifyEmailSentEvent: (streamId, data) => new VerifyEmailSentEvent(streamId, data),
        VerifyEmailSentSuccessEvent: (streamId, data) => new VerifyEmailSentSuccessEvent(streamId, data),
        VerifyEmailSentFailedEvent: (streamId, data, error) => new VerifyEmailSentFailedEvent(streamId, data, error),

        // verify email
        EmailVerifiedEvent: (streamId, data) => new EmailVerifiedEvent(streamId, data),
    };
}
