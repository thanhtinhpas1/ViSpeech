import {Logger, Inject} from '@nestjs/common';
import {EventsHandler, IEventHandler, EventBus} from '@nestjs/cqrs';
import {InjectRepository} from '@nestjs/typeorm';
import {PermissionDto} from 'permissions/dtos/permissions.dto';
import {PermissionDeletedEvent, PermissionDeletedSuccessEvent, PermissionDeletedFailedEvent} from '../impl/permission-deleted.event';
import {Repository} from 'typeorm';
import { CONSTANTS } from 'common/constant';
import { config } from '../../../../config';
import { ClientKafka } from '@nestjs/microservices';
import { Utils } from 'utils';

@EventsHandler(PermissionDeletedEvent)
export class PermissionDeletedHandler implements IEventHandler<PermissionDeletedEvent> {
    constructor(
        @InjectRepository(PermissionDto)
        private readonly repository: Repository<PermissionDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: PermissionDeletedEvent) {
        Logger.log(event.permissionId, 'PermissionDeletedEvent');
        const {streamId, permissionId} = event;

        try {
            await this.repository.update({_id: permissionId}, { status: CONSTANTS.STATUS.INVALID });
            this.eventBus.publish(new PermissionDeletedSuccessEvent(streamId, permissionId));
        } catch (error) {
            this.eventBus.publish(new PermissionDeletedFailedEvent(streamId, permissionId, error));
        }
    }
}

@EventsHandler(PermissionDeletedSuccessEvent)
export class PermissionDeletedSuccessHandler
    implements IEventHandler<PermissionDeletedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: PermissionDeletedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_DELETED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.permissionId, 'PermissionDeletedSuccessEvent');
    }
}

@EventsHandler(PermissionDeletedFailedEvent)
export class PermissionDeletedFailedHandler
    implements IEventHandler<PermissionDeletedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: PermissionDeletedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_DELETED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'PermissionDeletedFailedEvent');
    }
}
