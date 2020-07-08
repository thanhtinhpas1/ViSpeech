import { forwardRef, Logger, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands/handlers';
import { PermissionsController } from './controllers/permissions.controller';
import { PermissionDto } from './dtos/permissions.dto';
import { EventHandlers } from './events/handlers';
import { PermissionCreatedEvent, PermissionCreatedFailedEvent, PermissionCreatedSuccessEvent } from './events/impl/permission-created.event';
import { PermissionDeletedEvent, PermissionDeletedFailedEvent, PermissionDeletedSuccessEvent } from './events/impl/permission-deleted.event';
import { PermissionUpdatedEvent, PermissionUpdatedFailedEvent, PermissionUpdatedSuccessEvent } from './events/impl/permission-updated.event';
import { PermissionWelcomedEvent } from './events/impl/permission-welcomed.event';
import { QueryHandlers } from './queries/handler';
import { PermissionRepository } from './repository/permission.repository';
import { PermissionsSagas } from './sagas/permissions.sagas';
import { PermissionsService } from './services/permissions.service';
import { AuthModule } from '../auth/auth.module';
import { UserDto } from 'users/dtos/users.dto';
import { ProjectDto } from 'projects/dtos/projects.dto';
import {
    PermissionAssignEmailSentEvent, PermissionAssignEmailSentFailedEvent, PermissionAssignEmailSentSuccessEvent
} from './events/impl/permission-assign-email-sent.event';
import {
    PermissionAssignRepliedEvent, PermissionAssignRepliedFailedEvent, PermissionAssignRepliedSuccessEvent
} from './events/impl/permission-assign-replied.event';
import { config } from '../../config';
import { ClientsModule } from '@nestjs/microservices';
import { kafkaClientOptions } from 'common/kafka-client.options';
import {
    PermissionDeletedByUserIdEvent, PermissionDeletedByUserIdFailedEvent, PermissionDeletedByUserIdSuccessEvent
} from './events/impl/permission-deleted-by-userId.event';
import {
    PermissionDeletedByProjectIdEvent, PermissionDeletedByProjectIdFailedEvent, PermissionDeletedByProjectIdSuccessEvent
} from './events/impl/permission-deleted-by-projectId.event';
import { ProjectionDto } from '../core/event-store/lib/adapter/projection.dto';
import { EventStoreSubscriptionType } from '../core/event-store/lib/contract';
import { EventStore, EventStoreModule } from '../core/event-store/lib';
import { MongoStore } from '../core/event-store/lib/adapter/mongo-store';
import { getMongoRepository } from 'typeorm';

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
            ProjectionDto
        ]),
        forwardRef(() => AuthModule),
        CqrsModule,
        EventStoreModule.registerFeature({
            featureStreamName: '$ce-permission',
            subscriptions: [
                {
                    type: EventStoreSubscriptionType.CatchUp,
                    stream: '$ce-permission',
                    resolveLinkTos: true, // Default is true (Optional)
                    lastCheckpoint: 0, // Default is 0 (Optional)
                },
                {
                    type: EventStoreSubscriptionType.Volatile,
                    stream: '$ce-permission',
                },
                {
                    type: EventStoreSubscriptionType.Persistent,
                    stream: '$ce-permission',
                    persistentSubscriptionName: 'steamName',
                    resolveLinkTos: true,  // Default is true (Optional)
                },
            ],
            eventHandlers: {
                ...PermissionsModule.eventHandlers,
            },
        }),
    ],
    controllers: [PermissionsController],
    providers: [
        PermissionsService,
        PermissionsSagas,
        PermissionRepository,
        QueryBus, EventBus,
        CommandBus, EventPublisher,
        MongoStore,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
    ],
    exports: [PermissionsService],
})
export class PermissionsModule implements OnModuleInit {
    constructor(
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus,
        private readonly eventStore: EventStore,
    ) {
    }

    async onModuleInit() {
        this.event$.publisher = this.eventStore;
        this.event$.register(EventHandlers);
        this.command$.register(CommandHandlers);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([PermissionsSagas]);
        await this.seedProjection();
    }

    async seedProjection() {
        const userProjection = await getMongoRepository(ProjectionDto).findOne({streamName: '$ce-permission'});
        if (userProjection) {
            await getMongoRepository(ProjectionDto).save({...userProjection, expectedVersion: userProjection.eventNumber});
        } else {
            await getMongoRepository(ProjectionDto).save({streamName: '$ce-permission', eventNumber: 0, expectedVersion: 0});
        }
        Logger.log('Seed projection permission success')
    }

    public static eventHandlers = {
        // create
        PermissionCreatedEvent: (streamId, data) => new PermissionCreatedEvent(streamId, data),
        PermissionCreatedSuccessEvent: (streamId, data) => new PermissionCreatedSuccessEvent(streamId, data),
        PermissionCreatedFailedEvent: (streamId, data, error) => new PermissionCreatedFailedEvent(streamId, data, error),
        // delete
        PermissionDeletedEvent: (streamId, data) => new PermissionDeletedEvent(streamId, data),
        PermissionDeletedSuccessEvent: (streamId, data) => new PermissionDeletedSuccessEvent(streamId, data),
        PermissionDeletedFailedEvent: (streamId, data, error) => new PermissionDeletedFailedEvent(streamId, data, error),
        // delete by userId
        PermissionDeletedByUserIdEvent: (streamId, data) => new PermissionDeletedByUserIdEvent(streamId, data),
        PermissionDeletedByUserIdSuccessEvent: (streamId, data) => new PermissionDeletedByUserIdSuccessEvent(streamId, data),
        PermissionDeletedByUserIdFailedEvent: (streamId, data, error) => new PermissionDeletedByUserIdFailedEvent(streamId, data, error),
        // delete by projectId
        PermissionDeletedByProjectIdEvent: (streamId, data) => new PermissionDeletedByProjectIdEvent(streamId, data),
        PermissionDeletedByProjectIdSuccessEvent: (streamId, data) => new PermissionDeletedByProjectIdSuccessEvent(streamId, data),
        PermissionDeletedByProjectIdFailedEvent: (streamId, data, error) => new PermissionDeletedByProjectIdFailedEvent(streamId, data, error),
        // update
        PermissionUpdatedEvent: (streamId, data) => new PermissionUpdatedEvent(streamId, data),
        PermissionUpdatedSuccessEvent: (streamId, data) => new PermissionUpdatedSuccessEvent(streamId, data),
        PermissionUpdatedFailedEvent: (streamId, data, error) => new PermissionUpdatedFailedEvent(streamId, data, error),
        PermissionWelcomedEvent: (streamId, data) => new PermissionWelcomedEvent(streamId, data),
        // send email assign permission
        PermissionAssignEmailSentEvent: (streamId, data) => new PermissionAssignEmailSentEvent(streamId, data),
        PermissionAssignEmailSentSuccessEvent: (streamId, data) => new PermissionAssignEmailSentSuccessEvent(streamId, data),
        PermissionAssignEmailSentFailedEvent: (streamId, data, error) => new PermissionAssignEmailSentFailedEvent(streamId, data, error),
        PermissionAssignRepliedEvent: (streamId, data) => new PermissionAssignRepliedEvent(streamId, data),
        PermissionAssignRepliedSuccessEvent: (streamId, data) => new PermissionAssignRepliedSuccessEvent(streamId, data),
        PermissionAssignRepliedFailedEvent: (streamId, data, error) => new PermissionAssignRepliedFailedEvent(streamId, data, error),
    };
}
