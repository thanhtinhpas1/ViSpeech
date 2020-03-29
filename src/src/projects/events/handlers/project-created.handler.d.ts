import { EventBus, IEventHandler } from '@nestjs/cqrs';
import { ProjectCreatedEvent, ProjectCreatedFailedEvent, ProjectCreatedSuccessEvent } from '../impl/project-created.event';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { Repository } from 'typeorm';
export declare class ProjectCreatedHandler implements IEventHandler<ProjectCreatedEvent> {
    private readonly repository;
    private readonly eventBus;
    constructor(repository: Repository<ProjectDto>, eventBus: EventBus);
    handle(event: ProjectCreatedEvent): Promise<void>;
}
export declare class ProjectCreatedSuccessHandler implements IEventHandler<ProjectCreatedSuccessEvent> {
    handle(event: ProjectCreatedSuccessEvent): void;
}
export declare class ProjectCreatedFailedHandler implements IEventHandler<ProjectCreatedFailedEvent> {
    handle(event: ProjectCreatedFailedEvent): void;
}
