import {forwardRef, Logger, Module, OnModuleInit} from '@nestjs/common';
import {CommandBus, EventBus, EventPublisher, QueryBus} from '@nestjs/cqrs';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from 'auth/auth.module';
import {EventStoreModule} from 'core/event-store/event-store.module';
import {CommandHandlers as TokenCommandHandlers} from 'tokens/commands/handlers';
import {TokenRepository} from 'tokens/repository/token.repository';
import {TokensModule} from 'tokens/tokens.module';
import {EventStore} from '../core/event-store/event-store';
import {CommandHandlers} from './commands/handlers';
import {UsersController} from './controllers/users.controller';
import {UserDto} from './dtos/users.dto';
import {EventHandlers} from './events/handlers';
import {UserCreatedEvent, UserCreatedFailedEvent, UserCreatedSuccessEvent, UserCreationStartedEvent} from './events/impl/user-created.event';
import {UserDeletedEvent, UserDeletedFailedEvent, UserDeletedSuccessEvent} from './events/impl/user-deleted.event';
import {UserUpdatedEvent, UserUpdatedFailedEvent, UserUpdatedSuccessEvent} from './events/impl/user-updated.event';
import {UserWelcomedEvent} from './events/impl/user-welcomed.event';
import {QueryHandlers} from './queries/handler';
import {UserRepository} from './repository/user.repository';
import {UsersSagas} from './sagas/users.sagas';
import {UsersService} from './services/users.service';
import {UserRoleAssignedEvent} from './events/impl/user-role-assigned.event';
import {ChangedPasswordEvent} from './events/impl/changed-password.event';
import {getMongoRepository} from 'typeorm';
import {Utils} from '../utils';
import {CONSTANTS} from '../common/constant';
import {RoleDto} from '../roles/dtos/roles.dto';

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
                'admin@vispeech.com', null, [new RoleDto(CONSTANTS.ROLE.ADMIN)]);
            Logger.log('Seed admin account success', 'UserModule');
            await getMongoRepository(UserDto).save(admin);
        }catch (e) {
            Logger.warn('Seed admin account existed',  'UserModule');
        }
    }

    eventHandlers = {
        // create
        UserCreationStartedEvent: (id, data) => new UserCreationStartedEvent(id, data),
        UserCreatedEvent: (id, data) => new UserCreatedEvent(id, data),
        UserCreatedSuccessEvent: (id, data) => new UserCreatedSuccessEvent(id, data),
        UserCreatedFailedEvent: (id, data, error) => new UserCreatedFailedEvent(id, data, error),
        UserUpdatedEvent: (id, data) => new UserUpdatedEvent(id, data),
        UserUpdatedSuccessEvent: (id, data) => new UserUpdatedSuccessEvent(id, data),
        UserUpdatedFailedEvent: (id, error) => new UserUpdatedFailedEvent(id, error),
        // delete
        UserDeletedEvent: (data) => new UserDeletedEvent(data),
        UserDeletedSuccessEvent: (data) => new UserDeletedSuccessEvent(data),
        UserDeletedFailedEvent: (data, error) => new UserDeletedFailedEvent(data, error),
        UserWelcomedEvent: (data) => new UserWelcomedEvent(data),
        UserRoleAssignedEvent: (userId, roleName, assignerId) => new UserRoleAssignedEvent(userId, roleName, assignerId),
        ChangedPasswordEvent: (userId, newPassword, oldPassword) => new ChangedPasswordEvent(userId, newPassword, oldPassword),
    };
}
