import {CommandHandler, EventPublisher, ICommandHandler, EventBus} from '@nestjs/cqrs';
import {PermissionRepository} from '../../repository/permission.repository';
import {Logger, NotFoundException} from '@nestjs/common';
import { DeletePermissionByProjectIdCommand } from '../impl/delete-permission-by-projectId.command copy';
import { PermissionDeletedByProjectIdFailedEvent } from 'permissions/events/impl/permission-deleted-by-projectId.event';
import { getMongoRepository } from 'typeorm';
import { PermissionDto } from 'permissions/dtos/permissions.dto';

@CommandHandler(DeletePermissionByProjectIdCommand)
export class DeletePermissionByProjectIdHandler implements ICommandHandler<DeletePermissionByProjectIdCommand> {
    constructor(
        private readonly repository: PermissionRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: DeletePermissionByProjectIdCommand) {
        Logger.log('Async DeletePermissionByProjectIdHandler...', 'DeletePermissionByProjectIdCommand');
        const {streamId, projectId} = command;

        try {
            const permissions = await getMongoRepository(PermissionDto).find({ projectId })
            if (permissions.length === 0) {
                throw new NotFoundException(`Permission with projectId ${projectId} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const permissionModel = this.publisher.mergeObjectContext(
                await this.repository.deletePermissionByProjectId(streamId, projectId)
            );
            permissionModel.commit();
        } catch (error) {
            this.eventBus.publish(new PermissionDeletedByProjectIdFailedEvent(streamId, projectId, error));
        }
    }
}
