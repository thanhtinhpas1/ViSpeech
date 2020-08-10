import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PermissionRepository } from '../../repository/permission.repository';
import { Logger, BadRequestException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { DeletePermissionForAssigneeCommand } from '../impl/delete-permission-for-assignee.command';
import { PermissionForAssigneeDeletedFailedEvent } from 'permissions/events/impl/permission-for-assignee-deleted.event';
import { CONSTANTS } from 'common/constant';

@CommandHandler(DeletePermissionForAssigneeCommand)
export class DeletePermissionForAssigneeHandler implements ICommandHandler<DeletePermissionForAssigneeCommand> {
    constructor(
        private readonly repository: PermissionRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: DeletePermissionForAssigneeCommand) {
        Logger.log('Async DeletePermissionForAssigneeHandler...', 'DeletePermissionForAssigneeCommand');
        const { streamId, assigneePermissionDto } = command;
        const { projectId, assignerId, assigneeId } = assigneePermissionDto;

        try {
            const permissions =
                await getMongoRepository(PermissionDto).find({ projectId, assignerId, assigneeId, status: CONSTANTS.STATUS.ACCEPTED });
            if (permissions.length === 0) {
                throw new BadRequestException(`There is no permission with projectId ${projectId}, assignerId ${assignerId},
                    assigneeId ${assigneeId}, status ACCEPTED`);
            }

            // use mergeObjectContext for dto dispatch events
            const permissionModel = this.publisher.mergeObjectContext(
                await this.repository.deletePermissionForAssignee(streamId, assigneePermissionDto)
            );
            permissionModel.commit();
        } catch (error) {
            this.eventBus.publish(new PermissionForAssigneeDeletedFailedEvent(streamId, assigneePermissionDto, error));
        }
    }
}
