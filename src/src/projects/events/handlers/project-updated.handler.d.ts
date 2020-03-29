import { IEventHandler } from "@nestjs/cqrs";
import { ProjectDto } from "projects/dtos/projects.dto";
import { Repository } from "typeorm";
import { ProjectUpdatedEvent } from "../impl/project-updated.event";
export declare class ProjectUpdatedHandler implements IEventHandler<ProjectUpdatedEvent> {
    private readonly repository;
    constructor(repository: Repository<ProjectDto>);
    handle(event: ProjectUpdatedEvent): Promise<import("typeorm").UpdateResult>;
}
