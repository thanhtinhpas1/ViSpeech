import { IEvent } from '@nestjs/cqrs';
import { ProjectDto } from 'projects/dtos/projects.dto';

export class ProjectCreatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectDto: ProjectDto
    ) {
    }
}

export class ProjectCreatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectDto: ProjectDto,
    ) {
    }
}

export class ProjectCreatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectDto: ProjectDto,
        public readonly error: object,
    ) {
    }
}
