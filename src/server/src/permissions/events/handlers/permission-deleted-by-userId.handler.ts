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
    PermissionDeletedByUserIdEvent,
    PermissionDeletedByUserIdFailedEvent,
    PermissionDeletedByUserIdSuccessEvent
} from '../impl/permission-deleted-by-userId.event';

@EventsHandler(PermissionDeletedByUserIdEvent)
export class PermissionDeletedByUserIdHandler implements IEventHandler<PermissionDeletedByUserIdEvent> {
    constructor(
        @InjectRepository(PermissionDto)
        private readonly repository: Repository<PermissionDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: PermissionDeletedByUserIdEvent) {
        Logger.log(event.userId, 'PermissionDeletedByUserIdEvent');
        const { streamId, userId } = event;

        try {
            await getMongoRepository(PermissionDto).updateMany({ assigneeId: userId }, {
                $set: {
                    status: CONSTANTS.STATUS.INVALID,
                    updatedDate: new Date()
                }
            });
            await getMongoRepository(PermissionDto).updateMany({ assignerId: userId }, {
                $set: {
                    status: CONSTANTS.STATUS.INVALID,
                    updatedDate: new Date()
                }
            });
            this.eventBus.publish(new PermissionDeletedByUserIdSuccessEvent(streamId, userId));
        } catch (error) {
            this.eventBus.publish(new PermissionDeletedByUserIdFailedEvent(streamId, userId, error));
        }
    }
}

@EventsHandler(PermissionDeletedByUserIdSuccessEvent)
export class PermissionDeletedByUserIdSuccessHandler
    implements IEventHandler<PermissionDeletedByUserIdSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: PermissionDeletedByUserIdSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_DELETED_BY_USERID_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.userId, 'PermissionDeletedByUserIdSuccessEvent');
    }
}

@EventsHandler(PermissionDeletedByUserIdFailedEvent)
export class PermissionDeletedByUserIdFailedHandler
    implements IEventHandler<PermissionDeletedByUserIdFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: PermissionDeletedByUserIdFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_DELETED_BY_USERID_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'PermissionDeletedByUserIdFailedEvent');
    }
}
