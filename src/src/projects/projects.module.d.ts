import { OnModuleInit } from "@nestjs/common";
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { EventStore } from "core/event-store/event-store";
import { ProjectCreatedEvent, ProjectCreatedFailedEvent, ProjectCreatedSuccessEvent } from "./events/impl/project-created.event";
import { ProjectDeletedEvent } from "./events/impl/project-deleted.event";
import { ProjectUpdatedEvent } from "./events/impl/project-updated.event";
import { ProjectWelcomedEvent } from "./events/impl/project-welcomed.event";
export declare class ProjectsModule implements OnModuleInit {
    private readonly command$;
    private readonly query$;
    private readonly event$;
    private readonly eventStore;
    constructor(command$: CommandBus, query$: QueryBus, event$: EventBus, eventStore: EventStore);
    onModuleInit(): Promise<void>;
    static eventHandlers: {
        ProjectCreatedEvent: (streamId: any, data: any) => ProjectCreatedEvent;
        ProjectCreatedSuccessEvent: (streamId: any, data: any) => ProjectCreatedSuccessEvent;
        ProjectCreatedFailedEvent: (streamId: any, data: any, error: any) => ProjectCreatedFailedEvent;
        ProjectDeletedEvent: (streamId: any, data: any) => ProjectDeletedEvent;
        ProjectUpdatedEvent: (streamId: any, data: any) => ProjectUpdatedEvent;
        ProjectWelcomedEvent: (streamId: any, data: any) => ProjectWelcomedEvent;
    };
}
