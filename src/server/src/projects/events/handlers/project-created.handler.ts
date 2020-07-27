import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { Repository } from 'typeorm';
import { Utils } from 'utils';
import { config } from '../../../../config';
import {
    ProjectCreatedEvent,
    ProjectCreatedFailedEvent,
    ProjectCreatedSuccessEvent
} from '../impl/project-created.event';

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
        const { streamId, projectDto } = event;

        try {
            projectDto.isValid = Utils.convertToBoolean(projectDto.isValid);
            await this.repository.save(projectDto);
            this.eventBus.publish(new ProjectCreatedSuccessEvent(streamId, projectDto));
        } catch (error) {
            this.eventBus.publish(new ProjectCreatedFailedEvent(streamId, projectDto, error));
        }
    }
}

@EventsHandler(ProjectCreatedSuccessEvent)
export class ProjectCreatedSuccessHandler implements IEventHandler<ProjectCreatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: ProjectCreatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PROJECT_CREATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.projectDto._id, 'ProjectCreatedSuccessEvent');
    }
}

@EventsHandler(ProjectCreatedFailedEvent)
export class ProjectCreatedFailedHandler
    implements IEventHandler<ProjectCreatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: ProjectCreatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.PROJECT_CREATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'ProjectCreatedFailedEvent');
    }
}
