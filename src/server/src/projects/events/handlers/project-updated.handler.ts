import { Inject, Logger } from "@nestjs/common";
import { EventBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectDto } from "projects/dtos/projects.dto";
import { Repository } from "typeorm";
import {
    ProjectUpdatedEvent,
    ProjectUpdatedFailedEvent,
    ProjectUpdatedSuccessEvent
} from "../impl/project-updated.event";
import { Utils } from "utils";
import { CONSTANTS } from "common/constant";
import { config } from "../../../../config";
import { ClientKafka } from "@nestjs/microservices";

@EventsHandler(ProjectUpdatedEvent)
export class ProjectUpdatedHandler implements IEventHandler<ProjectUpdatedEvent> {
    constructor(
        @InjectRepository(ProjectDto)
        private readonly repository: Repository<ProjectDto>,
        private readonly eventBus: EventBus
    ) {
    }

    async handle(event: ProjectUpdatedEvent) {
        Logger.log(event.projectDto._id, 'ProjectUpdatedEvent'); // write here
        const {streamId, projectDto} = event;
        const {_id, ...projectInfo} = projectDto;

        try {
            const formattedInfo = Utils.removePropertiesFromObject(projectInfo, ['userId', 'isValid']);
            await this.repository.update({_id}, formattedInfo);
            this.eventBus.publish(new ProjectUpdatedSuccessEvent(streamId, projectDto));
        } catch (error) {
            this.eventBus.publish(new ProjectUpdatedFailedEvent(streamId, projectDto, error));
        }
    }
}

@EventsHandler(ProjectUpdatedSuccessEvent)
export class ProjectUpdatedSuccessHandler
    implements IEventHandler<ProjectUpdatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: ProjectUpdatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PROJECT_UPDATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.projectDto._id, 'ProjectUpdatedSuccessEvent');
    }
}

@EventsHandler(ProjectUpdatedFailedEvent)
export class ProjectUpdatedFailedHandler
    implements IEventHandler<ProjectUpdatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: ProjectUpdatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.PROJECT_UPDATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'ProjectUpdatedFailedEvent');
    }
}