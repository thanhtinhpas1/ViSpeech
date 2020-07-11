import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { getMongoRepository, Repository } from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { config } from '../../../../config';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';
import {
    ProjectDeletedByUserIdEvent,
    ProjectDeletedByUserIdFailedEvent,
    ProjectDeletedByUserIdSuccessEvent
} from '../impl/project-deleted-by-userId.event';

@EventsHandler(ProjectDeletedByUserIdEvent)
export class ProjectDeletedByUserIdHandler implements IEventHandler<ProjectDeletedByUserIdEvent> {
    constructor(
        @InjectRepository(ProjectDto)
        private readonly repository: Repository<ProjectDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: ProjectDeletedByUserIdEvent) {
        Logger.log(event.userId, 'ProjectDeletedByUserIdEvent');
        const {streamId, userId} = event;

        try {
            await getMongoRepository(ProjectDto).updateMany({userId}, {$set: {isValid: false, updatedDate: new Date()}});
            this.eventBus.publish(new ProjectDeletedByUserIdSuccessEvent(streamId, userId));
        } catch (error) {
            this.eventBus.publish(new ProjectDeletedByUserIdFailedEvent(streamId, userId, error));
        }
    }
}

@EventsHandler(ProjectDeletedByUserIdSuccessEvent)
export class ProjectDeletedByUserIdSuccessHandler
    implements IEventHandler<ProjectDeletedByUserIdSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: ProjectDeletedByUserIdSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PROJECT_DELETED_BY_USERID_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.userId, 'ProjectDeletedByUserIdSuccessEvent');
    }
}

@EventsHandler(ProjectDeletedByUserIdFailedEvent)
export class ProjectDeletedByUserIdFailedHandler
    implements IEventHandler<ProjectDeletedByUserIdFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: ProjectDeletedByUserIdFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.PROJECT_DELETED_BY_USERID_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'ProjectDeletedByUserIdFailedEvent');
    }
}
