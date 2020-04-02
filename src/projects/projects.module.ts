import { Module, OnModuleInit } from "@nestjs/common";
import { CommandBus, EventBus, EventPublisher, QueryBus } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventStore } from "core/event-store/event-store";
import { EventStoreModule } from "core/event-store/event-store.module";
import { CommandHandlers } from "./commands/handlers";
import { ProjectsController } from "./controllers/projects.controller";
import { ProjectDto } from "./dtos/projects.dto";
import { EventHandlers } from "./events/handlers";
import { ProjectCreatedEvent, ProjectCreatedFailedEvent, ProjectCreatedSuccessEvent } from "./events/impl/project-created.event";
import { ProjectDeletedEvent } from "./events/impl/project-deleted.event";
import { ProjectUpdatedEvent } from "./events/impl/project-updated.event";
import { ProjectWelcomedEvent } from "./events/impl/project-welcomed.event";
import { QueryHandlers } from "./queries/handler";
import { ProjectRepository } from "./repository/project.repository";
import { ProjectsSagas } from "./sagas/projects.sagas";
import { ProjectsService } from "./services/projects.service";
import { AuthModule } from "auth/auth.module";
import { PermissionDto } from "permissions/dtos/permissions.dto";
import { UserDto } from "users/dtos/users.dto";


@Module({
    imports: [
        TypeOrmModule.forFeature([ProjectDto, PermissionDto, UserDto]),
        AuthModule,
        EventStoreModule.forFeature(),
    ],
    controllers: [ProjectsController],
    providers: [
        ProjectsService,
        ProjectsSagas,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        ProjectRepository,
        QueryBus, EventBus, EventStore, CommandBus, EventPublisher,
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
        this.eventStore.setEventHandlers(ProjectsModule.eventHandlers);
        await this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
        this.event$.publisher = this.eventStore;
        /** ------------ */
        this.event$.register(EventHandlers);
        this.command$.register(CommandHandlers);
        this.query$.register(QueryHandlers);
        this.event$.registerSagas([ProjectsSagas]);
    }

    public static eventHandlers = {
        // create
        ProjectCreatedEvent: (streamId, data) => new ProjectCreatedEvent(streamId, data),
        ProjectCreatedSuccessEvent: (streamId, data) => new ProjectCreatedSuccessEvent(streamId, data),
        ProjectCreatedFailedEvent: (streamId, data, error) => new ProjectCreatedFailedEvent(streamId, data, error),

        ProjectDeletedEvent: (streamId, data) => new ProjectDeletedEvent(streamId, data),
        ProjectUpdatedEvent: (streamId, data) => new ProjectUpdatedEvent(streamId, data),
        ProjectWelcomedEvent: (streamId, data) => new ProjectWelcomedEvent(streamId, data),
    };
}
