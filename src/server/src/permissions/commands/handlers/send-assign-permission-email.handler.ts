import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PermissionRepository } from '../../repository/permission.repository';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { SendAssignPermissionEmailCommand } from '../impl/send-assign-permission-email.command';
import { getMongoRepository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { PermissionAssignEmailSentFailedEvent } from 'permissions/events/impl/permission-assign-email-sent.event';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { Utils } from 'utils';

@CommandHandler(SendAssignPermissionEmailCommand)
export class SendAssignPermissionEmailHandler implements ICommandHandler<SendAssignPermissionEmailCommand> {
    constructor(
        private readonly repository: PermissionRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: SendAssignPermissionEmailCommand) {
        Logger.log('Async SendAssignPermissionEmailHandler...', 'SendAssignPermissionEmailCommand');
        const { streamId, permissionAssignDto } = command;
        const { assigneeUsername, assignerId, projectId } = permissionAssignDto;

        try {
            const assignee = await getMongoRepository(UserDto).findOne({ username: assigneeUsername });
            if (!assignee) {
                throw new NotFoundException(`Assignee with username ${assigneeUsername} does not exist.`);
            } else if (!assignee.isActive) {
                throw new BadRequestException(`Assignee with username ${assigneeUsername} is not active.`);
            }

            const project = await getMongoRepository(ProjectDto).findOne({ _id: projectId });
            if (!project) {
                throw new NotFoundException(`Project with _id ${projectId} does not exist.`);
            } else if (!project.isValid) {
                throw new BadRequestException(`Project with _id ${projectId} is not valid.`);
            }

            const assigner = await getMongoRepository(UserDto).findOne({ _id: assignerId });
            if (!assigner) {
                throw new NotFoundException(`Assigner with _id ${assignerId} does not exist.`);
            }

            const permission = await getMongoRepository(PermissionDto).findOne({
                assignerId,
                assigneeId: assignee._id,
                projectId
            });
            if (permission || assignee._id === assignerId) {
                throw new BadRequestException(`Permission with assignerId "${assignerId}", assigneeUsername "${assigneeUsername}", 
                projectId "${projectId}" is existed or assignerId is not valid.`);
            }

            const permissionId = Utils.getUuid();
            // use mergeObjectContext for dto dispatch events
            const permissionModel = this.publisher.mergeObjectContext(
                await this.repository.sendAssignPermissionEmail(streamId, permissionAssignDto, permissionId)
            );
            permissionModel.commit();
        } catch (error) {
            this.eventBus.publish(new PermissionAssignEmailSentFailedEvent(streamId, permissionAssignDto, error));
        }
    }
}
