import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    PermissionAssignEmailSentEvent,
    PermissionAssignEmailSentFailedEvent,
    PermissionAssignEmailSentSuccessEvent
} from '../impl/permission-assign-email-sent.event';
import { EmailUtils } from 'utils/email.util';
import { UserDto } from 'users/dtos/users.dto';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { AuthService } from 'auth/auth.service';
import { config } from '../../../../config';
import { ClientKafka } from '@nestjs/microservices';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';

@EventsHandler(PermissionAssignEmailSentEvent)
export class PermissionAssignEmailSentHandler implements IEventHandler<PermissionAssignEmailSentEvent> {
    constructor(
        @InjectRepository(UserDto)
        private readonly userRepository: Repository<UserDto>,
        @InjectRepository(ProjectDto)
        private readonly projectRepository: Repository<ProjectDto>,
        private readonly authService: AuthService,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: PermissionAssignEmailSentEvent) {
        Logger.log(event.streamId, 'PermissionAssignEmailSentEvent');
        const { streamId, permissionAssignDto } = event;
        const { assigneeUsername, projectId, permissions, assignerId } = permissionAssignDto;

        try {
            const assignee = await this.userRepository.findOne({ username: assigneeUsername });
            if (!assignee) {
                throw new NotFoundException(`User with username "${assigneeUsername}" does not exist.`);
            }
            permissionAssignDto.assigneeId = assignee._id;

            const project = await this.projectRepository.findOne({ _id: projectId });
            if (!project) {
                throw new NotFoundException(`Project with _id ${projectId} does not exist.`);
            }

            const assigner = await this.userRepository.findOne({ _id: assignerId });
            if (!assigner) {
                throw new NotFoundException(`User with _id ${assignerId} does not exist.`);
            }

            const joinProjectToken = this.authService.generateEmailToken(assigner._id, project._id, assignee._id, permissions);
            await EmailUtils.sendInviteToJoinProjectEmail(assigner.username, assignee.username, project.name, assignee.email, joinProjectToken);
            this.eventBus.publish(new PermissionAssignEmailSentSuccessEvent(streamId, permissionAssignDto));
        } catch (error) {
            this.eventBus.publish(new PermissionAssignEmailSentFailedEvent(streamId, permissionAssignDto, error.toString()));
        }
    }
}

@EventsHandler(PermissionAssignEmailSentSuccessEvent)
export class PermissionAssignEmailSentSuccessHandler
    implements IEventHandler<PermissionAssignEmailSentSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: PermissionAssignEmailSentSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_ASSIGN_EMAIL_SENT_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.streamId, 'PermissionAssignEmailSentSuccessEvent');
    }
}

@EventsHandler(PermissionAssignEmailSentFailedEvent)
export class PermissionAssignEmailSentFailedHandler
    implements IEventHandler<PermissionAssignEmailSentFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: PermissionAssignEmailSentFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_ASSIGN_EMAIL_SENT_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'PermissionAssignEmailSentFailedEvent');
    }
}
