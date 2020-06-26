import { AggregateRoot } from '@nestjs/cqrs';
import { ProjectCreatedEvent } from '../events/impl/project-created.event';
import { ProjectUpdatedEvent } from '../events/impl/project-updated.event';
import { ProjectDeletedEvent } from '../events/impl/project-deleted.event';
import { ProjectWelcomedEvent } from '../events/impl/project-welcomed.event';
import { ProjectDeletedByUserIdEvent } from 'projects/events/impl/project-deleted-by-userId.event';

export class Project extends AggregateRoot {
    [x: string]: any;

    constructor(private readonly id: string | undefined) {
        super();
    }

    setData(data) {
        this.data = data;
    }

    createProject(streamId: string) {
        this.apply(new ProjectCreatedEvent(streamId, this.data));
    }

    updateProject(streamId: string) {
        this.apply(new ProjectUpdatedEvent(streamId, this.data));
    }

    welcomeProject(streamId: string) {
        this.apply(new ProjectWelcomedEvent(streamId, this.id));
    }

    deleteProject(streamId: string) {
        this.apply(new ProjectDeletedEvent(streamId, this.id));
    }

    deleteProjectByUserId(streamId: string, userId: string) {
        this.apply(new ProjectDeletedByUserIdEvent(streamId, userId));
    }
}
