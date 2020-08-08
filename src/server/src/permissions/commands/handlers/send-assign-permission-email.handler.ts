import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PermissionRepository } from '../../repository/permission.repository';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { SendAssignPermissionEmailCommand } from '../impl/send-assign-permission-email.command';
import { getMongoRepository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { PermissionDto, Permission, PermissionId } from 'permissions/dtos/permissions.dto';
import { PermissionAssignEmailSentFailedEvent } from 'permissions/events/impl/permission-assign-email-sent.event';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { Utils } from 'utils';
import { CONSTANTS } from 'common/constant';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { AuthService } from 'auth/auth.service';

@CommandHandler(SendAssignPermissionEmailCommand)
export class SendAssignPermissionEmailHandler implements ICommandHandler<SendAssignPermissionEmailCommand> {
    constructor(
        private readonly repository: PermissionRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus,
        private readonly authService: AuthService
    ) {
    }

    async execute(command: SendAssignPermissionEmailCommand) {
        Logger.log('Async SendAssignPermissionEmailHandler...', 'SendAssignPermissionEmailCommand');
        const { streamId, permissionAssignDto } = command;
        const { assigneeUsernames, assignerId, projectId } = permissionAssignDto;

        try {
            const assignees = await getMongoRepository(UserDto).find({ where: { username: { $in: [...assigneeUsernames] } } });
            if (assignees.length !== assigneeUsernames.length) {
                throw new BadRequestException(`At least one assignee's username is invalid.`);
            }
            const inactiveAssignees = assignees.filter(assignee => assignee.isActive === false);
            if (inactiveAssignees.length > 0) {
                throw new BadRequestException(`At least one assignee is inactive.`);
            }

            const assigneeIds = assignees.map(assignee => assignee._id);
            permissionAssignDto.assigneeIds = assigneeIds;

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

            const permissions = await getMongoRepository(PermissionDto).find({
                where: {
                    assignerId,
                    assigneeId: { $in: [...assigneeIds] },
                    projectId,
                    status: { $in: [CONSTANTS.STATUS.ACCEPTED, CONSTANTS.STATUS.REJECTED, CONSTANTS.STATUS.INVALID] }
                }
            });
            if (permissions.length > 0) {
                throw new BadRequestException(`At least one permission is replied or invalid`);
            }

            const permissionIds = assigneeIds.map(p => new PermissionId(p, Utils.getUuid()));
            // generate assigneeTokens
            const projectTokens = await getMongoRepository(TokenDto).find({ projectId });
            permissionAssignDto.permissions = [];
            for (const assigneeId of assigneeIds) {
                const permissions = projectTokens.map(token => {
                    const assigneeToken = this.authService.generateAssigneeToken(assignerId, projectId, assigneeId, token._id)
                    return new Permission(assigneeId, token._id, assigneeToken);
                })
                permissionAssignDto.permissions.push(...permissions);
            }

            // use mergeObjectContext for dto dispatch events
            const permissionModel = this.publisher.mergeObjectContext(
                await this.repository.sendAssignPermissionEmail(streamId, permissionAssignDto, permissionIds)
            );
            permissionModel.commit();
        } catch (error) {
            this.eventBus.publish(new PermissionAssignEmailSentFailedEvent(streamId, permissionAssignDto, error));
        }
    }
}
