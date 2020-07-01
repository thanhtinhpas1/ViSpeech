import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { ClientKafka, ClientsModule } from '@nestjs/microservices';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { DeletePermissionByUserIdHandler } from 'permissions/commands/handlers/delete-permission-by-userId.handler';
import { DeleteProjectByUserIdHandler } from 'projects/commands/handlers/delete-project-by-userId.handler';
import { CreateFreeTokenHandler } from 'tokens/commands/handlers/create-token.handler';
import { DeleteTokenByUserIdHandler } from 'tokens/commands/handlers/delete-token-by-userId.handler';
import { getMongoRepository, Repository } from 'typeorm';
import { CONSTANTS } from 'common/constant';
import { kafkaClientOptions } from 'common/kafka-client.options';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { RoleDto } from 'roles/dtos/roles.dto';
import { Utils } from 'utils';
import { CommandHandlers } from './commands/handlers';
import { UsersController } from './controllers/users.controller';
import { USER_TYPE, UserDto } from './dtos/users.dto';
import { EventHandlers } from './events/handlers';
import {
    EmailVerifiedEvent,
    EmailVerifiedFailedEvent,
    EmailVerifiedSuccessEvent
} from './events/impl/email-verified.event';
import {
    PasswordChangedEvent,
    PasswordChangedFailedEvent,
    PasswordChangedSuccessEvent,
} from './events/impl/password-changed.event';
import {
    UserCreatedEvent,
    UserCreatedFailedEvent,
    UserCreatedSuccessEvent,
    UserCreationStartedEvent,
} from './events/impl/user-created.event';
import { UserDeletedEvent, UserDeletedFailedEvent, UserDeletedSuccessEvent } from './events/impl/user-deleted.event';
import { UserUpdatedEvent, UserUpdatedFailedEvent, UserUpdatedSuccessEvent } from './events/impl/user-updated.event';
import { UserWelcomedEvent } from './events/impl/user-welcomed.event';
import {
    VerifyEmailSentEvent,
    VerifyEmailSentFailedEvent,
    VerifyEmailSentSuccessEvent,
} from './events/impl/verify-email-sent.event';
import { QueryHandlers } from './queries/handler';
import { UsersSagas } from './sagas/users.sagas';
import { UsersService } from './services/users.service';
import { config } from '../../config';
import { EventStore, EventStoreModule, EventStoreSubscriptionType } from "../core/event-store/lib";
import { TokensModule } from "../tokens/tokens.module";
import { ProjectsModule } from "../projects/projects.module";
import { PermissionsModule } from "../permissions/permissions.module";
import { AuthModule } from "../auth/auth.module";
import { UserRepository } from "./repository/user.repository";
import { TokenRepository } from "../tokens/repository/token.repository";
import { ProjectRepository } from "../projects/repository/project.repository";
import { PermissionRepository } from "../permissions/repository/permission.repository";
import { MongoStore } from "../core/event-store/lib/adapter/mongo-store";

@Module({
    imports: [
        ClientsModule.register(
            [{
                name: config.KAFKA.NAME, ...kafkaClientOptions,
            }]),
        TypeOrmModule.forFeature([UserDto, PermissionDto]),
        EventStoreModule.registerFeature({
            featureStreamName: '$ce-user',
            subscriptions: [
                {
                    type: EventStoreSubscriptionType.CatchUp,
                    stream: '$ce-user',
                    resolveLinkTos: true, // Default is true (Optional)
                    lastCheckpoint: 13, // Default is 0 (Optional)
                },
                {
                    type: EventStoreSubscriptionType.Volatile,
                    stream: '$ce-user',
                },
                {
                    type: EventStoreSubscriptionType.Persistent,
                    stream: '$ce-user',
                    persistentSubscriptionName: 'steamName',
                    resolveLinkTos: true,  // Default is true (Optional)
                },
            ],
            eventHandlers: {
                ...UsersModule.eventHandlers,
                ...TokensModule.eventHandlers,
                ...ProjectsModule.eventHandlers,
                ...PermissionsModule.eventHandlers,
            }
        }),
        AuthModule,
    ],
    controllers: [UsersController],
    providers: [
        UsersService, UsersSagas, QueryBus, EventBus, CommandBus, EventPublisher, ClientKafka,
        UserRepository, CreateFreeTokenHandler, DeleteTokenByUserIdHandler, DeleteProjectByUserIdHandler,
        DeletePermissionByUserIdHandler, UserRepository, TokenRepository, ProjectRepository, PermissionRepository,
        MongoStore, ...EventHandlers, ...CommandHandlers, ...QueryHandlers
    ],
    exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
    constructor(
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus,
        private readonly eventStore: EventStore,
        private readonly mongoStore: MongoStore,
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>,
    ) {
    }

    async onModuleInit() {
        this.eventStore.addEventHandlers({
            ...UsersModule.eventHandlers,
            ...TokensModule.eventHandlers,
            ...ProjectsModule.eventHandlers,
            ...PermissionsModule.eventHandlers,
        });
        this.eventStore.addEventStore(this.mongoStore);
        await this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
        this.event$.publisher = this.eventStore;
        this.event$.register(EventHandlers);
        this.command$.register([
            ...CommandHandlers,
            CreateFreeTokenHandler,
            DeleteTokenByUserIdHandler,
            DeleteProjectByUserIdHandler,
            DeletePermissionByUserIdHandler
        ]);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([UsersSagas]);
        // seed data
        await this.seedAdminAccount();
    }

    private async seedAdminAccount() {
        const admin = new UserDto(config.APPLICATION.ADMIN_NAME, config.APPLICATION.ADMIN_LAST_NAME, 'admin',
            Utils.hashPassword('admin'), config.APPLICATION.ADMIN_EMAIL,
            [new RoleDto(CONSTANTS.ROLE.ADMIN)], USER_TYPE.NORMAL);
        await getMongoRepository(UserDto).save(admin).then(() => {
            Logger.log('Seed admin account success.', 'UserModule');
        }).catch(err => Logger.warn('User admin existed.', err.message));
    }

    public static eventHandlers = {
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
        UserDeletedEvent: (streamId, data, isDeleted) => new UserDeletedEvent(streamId, data, isDeleted),
        UserDeletedSuccessEvent: (streamId, data) => new UserDeletedSuccessEvent(streamId, data),
        UserDeletedFailedEvent: (streamId, data, error) => new UserDeletedFailedEvent(streamId, data, error),
        UserWelcomedEvent: (streamId, data) => new UserWelcomedEvent(streamId, data),
        // send verify email
        VerifyEmailSentEvent: (streamId, data) => new VerifyEmailSentEvent(streamId, data),
        VerifyEmailSentSuccessEvent: (streamId, data) => new VerifyEmailSentSuccessEvent(streamId, data),
        VerifyEmailSentFailedEvent: (streamId, data, error) => new VerifyEmailSentFailedEvent(streamId, data, error),
        // verify email
        EmailVerifiedEvent: (streamId, data) => new EmailVerifiedEvent(streamId, data),
        EmailVerifiedSuccessEvent: (streamId, emailToken, newToken) => new EmailVerifiedSuccessEvent(streamId, emailToken, newToken),
        EmailVerifiedFailedEvent: (streamId, data, error) => new EmailVerifiedFailedEvent(streamId, data, error),
    };
}
