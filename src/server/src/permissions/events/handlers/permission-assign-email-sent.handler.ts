import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
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
    private readonly logger = new Logger(this.constructor.name);

    async handle(event: PermissionAssignEmailSentEvent) {
        Logger.log(event.streamId, 'PermissionAssignEmailSentEvent');
        const { streamId, permissionAssignDto, permissionIds } = event;
        const { assigneeUsernames, projectId, assignerId } = permissionAssignDto;

        try {
            const project = await this.projectRepository.findOne({ _id: projectId });
            const assigner = await this.userRepository.findOne({ _id: assignerId });
            for (const assigneeUsername of assigneeUsernames) {
                const assignee = await this.userRepository.findOne({ username: assigneeUsername });
                const joinProjectToken = this.authService.generateEmailToken(assigner._id, project._id, assignee._id,
                    `${CONSTANTS.TOKEN_EXPIRATION.REPLY_PERMISSION_ASSIGN} days`);
                await EmailUtils.sendInviteToJoinProjectEmail(assigner.username, assignee.username, project.name, assignee.email, joinProjectToken);
            }

            this.eventBus.publish(new PermissionAssignEmailSentSuccessEvent(streamId, permissionAssignDto, permissionIds));
        } catch (error) {
            this.logger.error(error.message)
            this.eventBus.publish(new PermissionAssignEmailSentFailedEvent(streamId, permissionAssignDto, error));
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
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.PERMISSION_ASSIGN_EMAIL_SENT_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'PermissionAssignEmailSentFailedEvent');
    }
}
