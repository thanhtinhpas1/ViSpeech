import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { getMongoRepository } from 'typeorm';
import { config } from '../../../../config';
import { ClientKafka } from '@nestjs/microservices';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';
import {
    PermissionAssigneeTokensUpdatedFailedEvent,
    PermissionAssigneeTokensUpdatedSuccessEvent,
    PermissionAssigneeTokensUpdatedEvent
} from '../impl/permission-assignee-tokens-updated.event';

@EventsHandler(PermissionAssigneeTokensUpdatedEvent)
export class PermissionAssigneeTokensUpdatedHandler implements IEventHandler<PermissionAssigneeTokensUpdatedEvent> {
    constructor(
        private readonly eventBus: EventBus,
    ) {
    }
    private readonly logger = new Logger(this.constructor.name);

    async handle(event: PermissionAssigneeTokensUpdatedEvent) {
        Logger.log(event.updatePermissionAssigneeTokensDto.projectId, 'PermissionAssigneeTokensUpdatedEvent'); // write here
        const { streamId, updatePermissionAssigneeTokensDto } = event;
        const { projectId, assignerId, assigneeTokens } = updatePermissionAssigneeTokensDto;

        try {
            for (const assigneeToken of assigneeTokens) {
                await getMongoRepository(PermissionDto).updateOne({ projectId, assignerId, assigneeId: assigneeToken.assigneeId,
                    status: CONSTANTS.STATUS.ACCEPTED }, { $push: { permissions: assigneeToken } });
            }
            this.eventBus.publish(new PermissionAssigneeTokensUpdatedSuccessEvent(streamId, updatePermissionAssigneeTokensDto));
        } catch (error) {
            this.logger.error(error.message)
            this.eventBus.publish(new PermissionAssigneeTokensUpdatedFailedEvent(streamId, updatePermissionAssigneeTokensDto, error));
        }
    }
}

@EventsHandler(PermissionAssigneeTokensUpdatedSuccessEvent)
export class PermissionAssigneeTokensUpdatedSuccessHandler
    implements IEventHandler<PermissionAssigneeTokensUpdatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: PermissionAssigneeTokensUpdatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_ASSIGNEE_TOKENS_UPDATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.updatePermissionAssigneeTokensDto.projectId, 'PermissionAssigneeTokensUpdatedSuccessEvent');
    }
}

@EventsHandler(PermissionAssigneeTokensUpdatedFailedEvent)
export class PermissionAssigneeTokensUpdatedFailedHandler
    implements IEventHandler<PermissionAssigneeTokensUpdatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: PermissionAssigneeTokensUpdatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_ASSIGNEE_TOKENS_UPDATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'PermissionAssigneeTokensUpdatedFailedEvent');
    }
}