import {EventBus, EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {ProjectCreatedEvent, ProjectCreatedFailedEvent, ProjectCreatedSuccessEvent} from '../impl/project-created.event';
import {Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ProjectDto} from 'projects/dtos/projects.dto';
import {Repository} from 'typeorm';

@EventsHandler(ProjectCreatedEvent)
export class ProjectCreatedHandler implements IEventHandler<ProjectCreatedEvent> {
    constructor(
        @InjectRepository(ProjectDto)
        private readonly repository: Repository<ProjectDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: ProjectCreatedEvent) {
        Logger.log(event.projectDto._id, 'ProjectCreatedEvent');
        const {streamId, projectDto} = event;
        let project = JSON.parse(JSON.stringify(projectDto));

        try {
            await this.repository.save(project);
            this.eventBus.publish(new ProjectCreatedSuccessEvent(streamId, projectDto));
        } catch (error) {
            this.eventBus.publish(new ProjectCreatedFailedEvent(streamId, projectDto, error));
        }
    }
}

@EventsHandler(ProjectCreatedSuccessEvent)
export class ProjectCreatedSuccessHandler
    implements IEventHandler<ProjectCreatedSuccessEvent> {
    handle(event: ProjectCreatedSuccessEvent) {
        Logger.log(event.projectDto._id, 'ProjectCreatedSuccessEvent');
    }
}

@EventsHandler(ProjectCreatedFailedEvent)
export class ProjectCreatedFailedHandler
    implements IEventHandler<ProjectCreatedFailedEvent> {
    handle(event: ProjectCreatedFailedEvent) {
        Logger.log(event.error, 'ProjectCreatedFailedEvent');
    }
}
