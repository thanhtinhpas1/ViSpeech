import { IEvent } from '@nestjs/cqrs';
import { ProjectDto } from '../../dtos/projects.dto';
export declare class ProjectUpdatedEvent implements IEvent {
    readonly streamId: string;
    readonly projectDto: ProjectDto;
    constructor(streamId: string, projectDto: ProjectDto);
}
