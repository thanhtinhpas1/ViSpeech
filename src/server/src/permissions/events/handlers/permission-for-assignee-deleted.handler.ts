import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { getMongoRepository, Repository } from 'typeorm';
import { CONSTANTS } from 'common/constant';
import { config } from '../../../../config';
import { ClientKafka } from '@nestjs/microservices';
import { Utils } from 'utils';
import {
    PermissionForAssigneeDeletedEvent,
    PermissionForAssigneeDeletedSuccessEvent,
    PermissionForAssigneeDeletedFailedEvent
} from '../impl/permission-for-assignee-deleted.event';

@EventsHandler(PermissionForAssigneeDeletedEvent)
export class PermissionForAssigneeDeletedHandler implements IEventHandler<PermissionForAssigneeDeletedEvent> {
    constructor(
        @InjectRepository(PermissionDto)
        private readonly repository: Repository<PermissionDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: PermissionForAssigneeDeletedEvent) {
        Logger.log(event.assigneePermissionDto.assigneeId, 'PermissionForAssigneeDeletedEvent');
        const { streamId, assigneePermissionDto } = event;
        const { projectId, assignerId, assigneeId } = assigneePermissionDto;

        try {
            await getMongoRepository(PermissionDto).updateMany({ projectId, assignerId, assigneeId, status: CONSTANTS.STATUS.ACCEPTED }, {
                $set: {
                    status: CONSTANTS.STATUS.INVALID,
                    updatedDate: new Date()
                }
            });
            this.eventBus.publish(new PermissionForAssigneeDeletedSuccessEvent(streamId, assigneePermissionDto));
        } catch (error) {
            this.eventBus.publish(new PermissionForAssigneeDeletedFailedEvent(streamId, assigneePermissionDto, error));
        }
    }
}

@EventsHandler(PermissionForAssigneeDeletedSuccessEvent)
export class PermissionForAssigneeDeletedSuccessHandler
    implements IEventHandler<PermissionForAssigneeDeletedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: PermissionForAssigneeDeletedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_FOR_ASSIGNEE_DELETED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.assigneePermissionDto.assigneeId, 'PermissionForAssigneeDeletedSuccessEvent');
    }
}

@EventsHandler(PermissionForAssigneeDeletedFailedEvent)
export class PermissionForAssigneeDeletedFailedHandler
    implements IEventHandler<PermissionForAssigneeDeletedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: PermissionForAssigneeDeletedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_FOR_ASSIGNEE_DELETED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'PermissionForAssigneeDeletedFailedEvent');
    }
}
