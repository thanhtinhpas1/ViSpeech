import {Logger, NotFoundException, Inject} from '@nestjs/common';
import {EventsHandler, IEventHandler, EventBus} from '@nestjs/cqrs';
import {InjectRepository} from '@nestjs/typeorm';
import {PermissionDto} from 'permissions/dtos/permissions.dto';
import {Repository} from 'typeorm';
import {PermissionUpdatedEvent, PermissionUpdatedSuccessEvent, PermissionUpdatedFailedEvent} from '../impl/permission-updated.event';
import { config } from '../../../../config';
import { ClientKafka } from '@nestjs/microservices';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';

@EventsHandler(PermissionUpdatedEvent)
export class PermissionUpdatedHandler implements IEventHandler<PermissionUpdatedEvent> {
    constructor(
        @InjectRepository(PermissionDto)
        private readonly repository: Repository<PermissionDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: PermissionUpdatedEvent) {
        Logger.log(event.permissionDto._id, 'PermissionUpdatedEvent'); // write here
        const {streamId, permissionDto} = event;
        const {_id, ...permissionInfo} = permissionDto;

        try {
            const permission = await this.repository.findOne({ _id });
            if (!permission) {
                throw new NotFoundException(`Permission with _id ${_id} does not exist.`);
            }

            await this.repository.update({_id}, permissionInfo);
            this.eventBus.publish(new PermissionUpdatedSuccessEvent(streamId, permissionDto));
        } catch (error) {
            this.eventBus.publish(new PermissionUpdatedFailedEvent(streamId, permissionDto, error));
        }
    }
}

@EventsHandler(PermissionUpdatedSuccessEvent)
export class PermissionUpdatedSuccessHandler
    implements IEventHandler<PermissionUpdatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: PermissionUpdatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_UPDATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.permissionDto._id, 'PermissionUpdatedSuccessEvent');
    }
}

@EventsHandler(PermissionUpdatedFailedEvent)
export class PermissionUpdatedFailedHandler
    implements IEventHandler<PermissionUpdatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: PermissionUpdatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_UPDATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'PermissionUpdatedFailedEvent');
    }
}