import { IEvent } from '@nestjs/cqrs';
import { ProjectDto } from '../../dtos/projects.dto';

export class ProjectUpdatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectDto: ProjectDto) {
    }
}

export class ProjectUpdatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectDto: ProjectDto) {
    }
}

export class ProjectUpdatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly projectDto: ProjectDto,
        public readonly error: object) {
    }
}
