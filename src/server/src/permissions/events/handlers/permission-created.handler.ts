import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { Repository } from 'typeorm';
import { Utils } from 'utils';
import { config } from '../../../../config';
import {
    PermissionCreatedEvent,
    PermissionCreatedFailedEvent,
    PermissionCreatedSuccessEvent
} from '../impl/permission-created.event';

@EventsHandler(PermissionCreatedEvent)
export class PermissionCreatedHandler implements IEventHandler<PermissionCreatedEvent> {
    constructor(
        @InjectRepository(PermissionDto)
        private readonly repository: Repository<PermissionDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: PermissionCreatedEvent) {
        Logger.log(event.permissionDto._id, 'PermissionCreatedEvent');
        const { streamId, permissionDto } = event;
        const permission = JSON.parse(JSON.stringify(permissionDto));

        try {
            permission.permissions = Utils.convertToArray(permission.permissions);
            await this.repository.save(permission);
            this.eventBus.publish(new PermissionCreatedSuccessEvent(streamId, permissionDto));
        } catch (error) {
            this.eventBus.publish(new PermissionCreatedFailedEvent(streamId, permissionDto, error));
        }
    }
}

@EventsHandler(PermissionCreatedSuccessEvent)
export class PermissionCreatedSuccessHandler
    implements IEventHandler<PermissionCreatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: PermissionCreatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_CREATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.permissionDto._id, 'PermissionCreatedSuccessEvent');
    }
}

@EventsHandler(PermissionCreatedFailedEvent)
export class PermissionCreatedFailedHandler
    implements IEventHandler<PermissionCreatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: PermissionCreatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_CREATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'PermissionCreatedFailedEvent');
    }
}
