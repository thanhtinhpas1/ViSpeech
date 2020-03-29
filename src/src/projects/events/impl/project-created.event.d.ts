import { IEvent } from '@nestjs/cqrs';
import { ProjectDto } from 'projects/dtos/projects.dto';
export declare class ProjectCreatedEvent implements IEvent {
    readonly streamId: string;
    readonly projectDto: ProjectDto;
    constructor(streamId: string, projectDto: ProjectDto);
}
export declare class ProjectCreatedSuccessEvent implements IEvent {
    readonly streamId: string;
    readonly projectDto: any;
    constructor(streamId: string, projectDto: any);
}
export declare class ProjectCreatedFailedEvent implements IEvent {
    readonly streamId: string;
    readonly projectDto: ProjectDto;
    readonly error: object;
    constructor(streamId: string, projectDto: ProjectDto, error: object);
}
