import {forwardRef, Module, OnModuleInit} from '@nestjs/common';
import {CommandBus, EventBus, EventPublisher, QueryBus} from '@nestjs/cqrs';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EventStore} from 'core/event-store/event-store';
import {EventStoreModule} from 'core/event-store/event-store.module';
import {CommandHandlers} from './commands/handlers';
import {PermissionsController} from './controllers/permissions.controller';
import {PermissionDto} from './dtos/permissions.dto';
import {EventHandlers} from './events/handlers';
import {PermissionCreatedEvent, PermissionCreatedFailedEvent, PermissionCreatedSuccessEvent} from './events/impl/permission-created.event';
import {PermissionDeletedEvent} from './events/impl/permission-deleted.event';
import {PermissionUpdatedEvent} from './events/impl/permission-updated.event';
import {PermissionWelcomedEvent} from './events/impl/permission-welcomed.event';
import {QueryHandlers} from './queries/handler';
import {PermissionRepository} from './repository/permission.repository';
import {PermissionsSagas} from './sagas/permissions.sagas';
import {PermissionsService} from './services/permissions.service';
import {AuthModule} from '../auth/auth.module';
import {UserDto} from 'users/dtos/users.dto';
import {ProjectDto} from 'projects/dtos/projects.dto';
import {
    PermissionAssignEmailSentEvent,
    PermissionAssignEmailSentFailedEvent,
    PermissionAssignEmailSentSuccessEvent
} from './events/impl/permission-assign-email-sent.event';
import {PermissionAssignRepliedEvent} from './events/impl/permission-assign-replied.event';

@Module({
    imports: [
        TypeOrmModule.forFeature([PermissionDto, UserDto, ProjectDto]),
        forwardRef(() => AuthModule),
        EventStoreModule.forFeature(),
    ],
    controllers: [PermissionsController],
    providers: [
        PermissionsService,
        PermissionsSagas,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        PermissionRepository,
        QueryBus, EventBus, EventStore, CommandBus, EventPublisher,
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
        this.eventStore.setEventHandlers(PermissionsModule.eventHandlers);
        await this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
        this.event$.publisher = this.eventStore;
        /** ------------ */
        this.event$.register(EventHandlers);
        this.command$.register(CommandHandlers);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([PermissionsSagas]);
    }

    public static eventHandlers = {
        // create
        PermissionCreatedEvent: (streamId, data) => new PermissionCreatedEvent(streamId, data),
        PermissionCreatedSuccessEvent: (streamId, data) => new PermissionCreatedSuccessEvent(streamId, data),
        PermissionCreatedFailedEvent: (streamId, data, error) => new PermissionCreatedFailedEvent(streamId, data, error),

        PermissionDeletedEvent: (streamId, data) => new PermissionDeletedEvent(streamId, data),
        PermissionUpdatedEvent: (streamId, data) => new PermissionUpdatedEvent(streamId, data),
        PermissionWelcomedEvent: (streamId, data) => new PermissionWelcomedEvent(streamId, data),

        // send email assign permisison
        PermissionAssignEmailSentEvent: (streamId, data) => new PermissionAssignEmailSentEvent(streamId, data),
        PermissionAssignEmailSentSuccessEvent: (streamId, data) => new PermissionAssignEmailSentSuccessEvent(streamId, data),
        PermissionAssignEmailSentFailedEvent: (streamId, data, error) => new PermissionAssignEmailSentFailedEvent(streamId, data, error),

        // reply permission assign
        PermissionAssignRepliedEvent: (streamId, data) => new PermissionAssignRepliedEvent(streamId, data),
    };
}
