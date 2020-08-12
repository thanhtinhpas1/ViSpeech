import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { Repository } from 'typeorm';
import { config } from '../../../../config';
import { ClientKafka } from '@nestjs/microservices';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';
import {
    PermissionExpirationDateUpdatedEvent,
    PermissionExpirationDateUpdatedSuccessEvent,
    PermissionExpirationDateUpdatedFailedEvent
} from '../impl/permission-expiration-date-updated.event';

@EventsHandler(PermissionExpirationDateUpdatedEvent)
export class PermissionExpirationDateUpdatedHandler implements IEventHandler<PermissionExpirationDateUpdatedEvent> {
    constructor(
        @InjectRepository(PermissionDto)
        private readonly repository: Repository<PermissionDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: PermissionExpirationDateUpdatedEvent) {
        Logger.log(event.assigneePermissionDto.assigneeId, 'PermissionExpirationDateUpdatedEvent'); // write here
        const { streamId, assigneePermissionDto, expiresIn } = event;
        const { projectId, assignerId, assigneeId } = assigneePermissionDto;

        try {
            await this.repository.update({ projectId, assignerId, assigneeId, status: CONSTANTS.STATUS.ACCEPTED },
                { expiresIn: Utils.getOnlyDate(expiresIn), updatedDate: new Date() });
            this.eventBus.publish(new PermissionExpirationDateUpdatedSuccessEvent(streamId, assigneePermissionDto, expiresIn));
        } catch (error) {
            this.eventBus.publish(new PermissionExpirationDateUpdatedFailedEvent(streamId, assigneePermissionDto, expiresIn, error));
        }
    }
}

@EventsHandler(PermissionExpirationDateUpdatedSuccessEvent)
export class PermissionExpirationDateUpdatedSuccessHandler
    implements IEventHandler<PermissionExpirationDateUpdatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: PermissionExpirationDateUpdatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_EXPIRATION_DATE_UPDATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.assigneePermissionDto.assigneeId, 'PermissionExpirationDateUpdatedSuccessEvent');
    }
}

@EventsHandler(PermissionExpirationDateUpdatedFailedEvent)
export class PermissionExpirationDateUpdatedFailedHandler
    implements IEventHandler<PermissionExpirationDateUpdatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: PermissionExpirationDateUpdatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_EXPIRATION_DATE_UPDATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'PermissionExpirationDateUpdatedFailedEvent');
    }
}