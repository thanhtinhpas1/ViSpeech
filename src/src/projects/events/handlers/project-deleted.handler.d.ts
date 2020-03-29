import { IEventHandler } from '@nestjs/cqrs';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { ProjectDeletedEvent } from '../impl/project-deleted.event';
import { Repository } from 'typeorm';
export declare class ProjectDeletedHandler implements IEventHandler<ProjectDeletedEvent> {
    private readonly repository;
    constructor(repository: Repository<ProjectDto>);
    handle(event: ProjectDeletedEvent): Promise<void>;
}
