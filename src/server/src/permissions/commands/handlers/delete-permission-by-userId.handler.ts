import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PermissionRepository } from '../../repository/permission.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { DeletePermissionByUserIdCommand } from '../impl/delete-permission-by-userId.command';
import { getMongoRepository } from 'typeorm';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { PermissionDeletedByUserIdFailedEvent } from 'permissions/events/impl/permission-deleted-by-userId.event';

@CommandHandler(DeletePermissionByUserIdCommand)
export class DeletePermissionByUserIdHandler implements ICommandHandler<DeletePermissionByUserIdCommand> {
    constructor(
        private readonly repository: PermissionRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: DeletePermissionByUserIdCommand) {
        Logger.log('Async DeletePermissionByUserIdHandler...', 'DeletePermissionByUserIdCommand');
        const {streamId, userId} = command;

        try {
            const permissionsWithAssigneeId = await getMongoRepository(PermissionDto).find({assigneeId: userId});
            const permissionsWithAssignerId = await getMongoRepository(PermissionDto).find({assignerId: userId})
            if (permissionsWithAssigneeId.length === 0 && permissionsWithAssignerId.length === 0) {
                throw new NotFoundException(`Permission with assigneeId/ assignerId "${userId}" does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const permissionModel = this.publisher.mergeObjectContext(
                await this.repository.deletePermissionByUserId(streamId, userId)
            );
            permissionModel.commit();
        } catch (error) {
            this.eventBus.publish(new PermissionDeletedByUserIdFailedEvent(streamId, userId, error));
        }
    }
}
