import {Logger, NotFoundException, Inject} from '@nestjs/common';
import {EventsHandler, IEventHandler, EventBus} from '@nestjs/cqrs';
import {InjectRepository} from '@nestjs/typeorm';
import {ProjectDto} from 'projects/dtos/projects.dto';
import {ProjectDeletedEvent, ProjectDeletedSuccessEvent, ProjectDeletedFailedEvent} from '../impl/project-deleted.event';
import {Repository} from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { config } from '../../../../config';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';

@EventsHandler(ProjectDeletedEvent)
export class ProjectDeletedHandler implements IEventHandler<ProjectDeletedEvent> {
    constructor(
        @InjectRepository(ProjectDto)
        private readonly repository: Repository<ProjectDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: ProjectDeletedEvent) {
        Logger.log(event.projectId, 'ProjectDeletedEvent');
        const {streamId, projectId} = event;

        try {
            const project = await this.repository.findOne({_id: projectId});
            if (!project) {
                throw new NotFoundException(`Project with _id ${projectId} does not exist.`);
            }
            await this.repository.update({_id: projectId}, {isValid: false});
            this.eventBus.publish(new ProjectDeletedSuccessEvent(streamId, projectId));
        } catch (error) {
            this.eventBus.publish(new ProjectDeletedFailedEvent(streamId, projectId, error));
        }
    }
}

@EventsHandler(ProjectDeletedSuccessEvent)
export class ProjectDeletedSuccessHandler
    implements IEventHandler<ProjectDeletedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: ProjectDeletedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PROJECT_DELETED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.projectId, 'ProjectDeletedSuccessEvent');
    }
}

@EventsHandler(ProjectDeletedFailedEvent)
export class ProjectDeletedFailedHandler
    implements IEventHandler<ProjectDeletedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: ProjectDeletedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.PROJECT_DELETED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'ProjectDeletedFailedEvent');
    }
}
