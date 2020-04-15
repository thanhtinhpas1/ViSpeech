import {Logger, Inject} from '@nestjs/common';
import {EventsHandler, IEventHandler, EventBus} from '@nestjs/cqrs';
import {InjectRepository} from '@nestjs/typeorm';
import {PermissionDto} from 'permissions/dtos/permissions.dto';
import {Repository} from 'typeorm';
import {PermissionAssignRepliedEvent, PermissionAssignRepliedSuccessEvent, PermissionAssignRepliedFailedEvent} from '../impl/permission-assign-replied.event';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import { config } from '../../../../config';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';

@EventsHandler(PermissionAssignRepliedEvent)
export class PermissionAssignRepliedHandler implements IEventHandler<PermissionAssignRepliedEvent> {
    constructor(
        @InjectRepository(PermissionDto)
        private readonly repository: Repository<PermissionDto>,
        private readonly jwtService: JwtService,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: PermissionAssignRepliedEvent) {
        Logger.log(event.streamId, 'PermissionAssignRepliedEvent'); // write here
        const {streamId, permissionResponseDto} = event;
        const {emailToken, status} = permissionResponseDto;

        try {
            const decodedToken = this.jwtService.decode(emailToken);
            const assignerId = decodedToken['assignerId'];
            const assigneeId = decodedToken['assigneeId'];
            const projectId = decodedToken['projectId'];
            await this.repository.update({assigneeId, assignerId, projectId}, {status});
            this.eventBus.publish(new PermissionAssignRepliedSuccessEvent(streamId, permissionResponseDto));
        } catch (error) {
            this.eventBus.publish(new PermissionAssignRepliedFailedEvent(streamId, permissionResponseDto, error));
        }
    }
}

@EventsHandler(PermissionAssignRepliedSuccessEvent)
export class PermissionAssignRepliedSuccessHandler
    implements IEventHandler<PermissionAssignRepliedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: PermissionAssignRepliedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_ASSIGN_REPLIED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.streamId, 'PermissionAssignRepliedSuccessEvent');
    }
}

@EventsHandler(PermissionAssignRepliedFailedEvent)
export class PermissionAssignRepliedFailedHandler
    implements IEventHandler<PermissionAssignRepliedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: PermissionAssignRepliedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_ASSIGN_REPLIED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'PermissionAssignRepliedFailedEvent');
    }
}
