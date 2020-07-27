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
    PermissionDeletedByProjectIdEvent,
    PermissionDeletedByProjectIdFailedEvent,
    PermissionDeletedByProjectIdSuccessEvent
} from '../impl/permission-deleted-by-projectId.event';

@EventsHandler(PermissionDeletedByProjectIdEvent)
export class PermissionDeletedByProjectIdHandler implements IEventHandler<PermissionDeletedByProjectIdEvent> {
    constructor(
        @InjectRepository(PermissionDto)
        private readonly repository: Repository<PermissionDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: PermissionDeletedByProjectIdEvent) {
        Logger.log(event.projectId, 'PermissionDeletedByProjectIdEvent');
        const { streamId, projectId } = event;

        try {
            await getMongoRepository(PermissionDto).updateMany({ projectId }, {
                $set: {
                    status: CONSTANTS.STATUS.INVALID,
                    updatedDate: new Date()
                }
            });
            this.eventBus.publish(new PermissionDeletedByProjectIdSuccessEvent(streamId, projectId));
        } catch (error) {
            this.eventBus.publish(new PermissionDeletedByProjectIdFailedEvent(streamId, projectId, error));
        }
    }
}

@EventsHandler(PermissionDeletedByProjectIdSuccessEvent)
export class PermissionDeletedByProjectIdSuccessHandler
    implements IEventHandler<PermissionDeletedByProjectIdSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: PermissionDeletedByProjectIdSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_DELETED_BY_PROJECTID_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.projectId, 'PermissionDeletedByProjectIdSuccessEvent');
    }
}

@EventsHandler(PermissionDeletedByProjectIdFailedEvent)
export class PermissionDeletedByProjectIdFailedHandler
    implements IEventHandler<PermissionDeletedByProjectIdFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: PermissionDeletedByProjectIdFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_DELETED_BY_PROJECTID_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'PermissionDeletedByProjectIdFailedEvent');
    }
}
