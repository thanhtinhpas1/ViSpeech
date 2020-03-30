import {EventBus, EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {PermissionCreatedEvent, PermissionCreatedFailedEvent, PermissionCreatedSuccessEvent} from '../impl/permission-created.event';
import {Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {PermissionDto} from 'permissions/dtos/permissions.dto';
import {Repository} from 'typeorm';
import { Utils } from 'utils';

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
        const {streamId, permissionDto} = event;
        let permission = JSON.parse(JSON.stringify(permissionDto));

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
    handle(event: PermissionCreatedSuccessEvent) {
        Logger.log(event.permissionDto._id, 'PermissionCreatedSuccessEvent');
    }
}

@EventsHandler(PermissionCreatedFailedEvent)
export class PermissionCreatedFailedHandler
    implements IEventHandler<PermissionCreatedFailedEvent> {
    handle(event: PermissionCreatedFailedEvent) {
        Logger.log(event.error, 'PermissionCreatedFailedEvent');
    }
}
