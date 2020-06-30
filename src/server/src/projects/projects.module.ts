import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { kafkaClientOptions } from 'common/kafka-client.options';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { UserDto } from 'users/dtos/users.dto';
import { config } from '../../config';
import { CommandHandlers } from './commands/handlers';
import { ProjectsController } from './controllers/projects.controller';
import { EventHandlers } from './events/handlers';
import {
    ProjectCreatedEvent,
    ProjectCreatedFailedEvent,
    ProjectCreatedSuccessEvent
} from './events/impl/project-created.event';
import {
    ProjectDeletedEvent,
    ProjectDeletedFailedEvent,
    ProjectDeletedSuccessEvent
} from './events/impl/project-deleted.event';
import {
    ProjectUpdatedEvent,
    ProjectUpdatedFailedEvent,
    ProjectUpdatedSuccessEvent
} from './events/impl/project-updated.event';
import { ProjectWelcomedEvent } from './events/impl/project-welcomed.event';
import { QueryHandlers } from './queries/handler';
import { ProjectRepository } from './repository/project.repository';
import { ProjectsSagas } from './sagas/projects.sagas';
import { ProjectsService } from './services/projects.service';
import {
    ProjectDeletedByUserIdEvent,
    ProjectDeletedByUserIdFailedEvent,
    ProjectDeletedByUserIdSuccessEvent
} from './events/impl/project-deleted-by-userId.event';
import { TokenRepository } from 'tokens/repository/token.repository';
import { DeleteTokenByProjectIdHandler } from 'tokens/commands/handlers/delete-token-by-projectId.handler';
import { TokensModule } from 'tokens/tokens.module';
import { EventStore, EventStoreModule, EventStoreSubscriptionType } from '../core/event-store/lib';
import { ProjectDto } from './dtos/projects.dto';

@Module({
    imports: [
        ClientsModule.register([{
            name: config.KAFKA.NAME,
            ...kafkaClientOptions,
        }]),
        TypeOrmModule.forFeature([
            PermissionDto,
            UserDto,
            ProjectDto,
        ]),
        forwardRef(() => AuthModule),
        CqrsModule,
        EventStoreModule.registerFeature({
            featureStreamName: '$ce-project',
            subscriptions: [
                {
                    type: EventStoreSubscriptionType.CatchUp,
                    stream: '$ce-project',
                    resolveLinkTos: true, // Default is true (Optional)
                    lastCheckpoint: 13, // Default is 0 (Optional)
                },
                {
                    type: EventStoreSubscriptionType.Volatile,
                    stream: '$ce-project',
                },
                {
                    type: EventStoreSubscriptionType.Persistent,
                    stream: '$ce-project',
                    persistentSubscriptionName: 'steamName',
                    resolveLinkTos: true,  // Default is true (Optional)
                },
            ],
            eventHandlers: {},
        }),
    ],
    controllers: [ProjectsController],
    providers: [
        ProjectsService,
        ProjectsSagas,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        DeleteTokenByProjectIdHandler,
        ProjectRepository, TokenRepository,
        QueryBus, EventBus,
        CommandBus, EventPublisher,
    ],
    exports: [ProjectsService],
})
export class ProjectsModule implements OnModuleInit {
    constructor(
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus,
        private readonly eventStore: EventStore,
    ) {
    }

    async onModuleInit() {
        this.eventStore.addEventHandlers({
            ...ProjectsModule.eventHandlers, ...TokensModule.eventHandlers,
        })
        await this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
        this.event$.publisher = this.eventStore;
        this.event$.register(EventHandlers);
        this.command$.register([...CommandHandlers, DeleteTokenByProjectIdHandler]);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([ProjectsSagas]);
    }

    public static eventHandlers = {
        // create
        ProjectCreatedEvent: (streamId, data) => new ProjectCreatedEvent(streamId, data),
        ProjectCreatedSuccessEvent: (streamId, data) => new ProjectCreatedSuccessEvent(streamId, data),
        ProjectCreatedFailedEvent: (streamId, data, error) => new ProjectCreatedFailedEvent(streamId, data, error),
        // delete
        ProjectDeletedEvent: (streamId, data) => new ProjectDeletedEvent(streamId, data),
        ProjectDeletedSuccessEvent: (streamId, data) => new ProjectDeletedSuccessEvent(streamId, data),
        ProjectDeletedFailedEvent: (streamId, data, error) => new ProjectDeletedFailedEvent(streamId, data, error),
        // delete by userId
        ProjectDeletedByUserIdEvent: (streamId, data) => new ProjectDeletedByUserIdEvent(streamId, data),
        ProjectDeletedByUserIdSuccessEvent: (streamId, data) => new ProjectDeletedByUserIdSuccessEvent(streamId, data),
        ProjectDeletedByUserIdFailedEvent: (streamId, data, error) => new ProjectDeletedByUserIdFailedEvent(streamId, data, error),
        // update
        ProjectUpdatedEvent: (streamId, data) => new ProjectUpdatedEvent(streamId, data),
        ProjectUpdatedSuccessEvent: (streamId, data) => new ProjectUpdatedSuccessEvent(streamId, data),
        ProjectUpdatedFailedEvent: (streamId, data, error) => new ProjectUpdatedFailedEvent(streamId, data, error),
        ProjectWelcomedEvent: (streamId, data) => new ProjectWelcomedEvent(streamId, data),
    };
}
