import {CommandHandler, EventPublisher, ICommandHandler, EventBus} from '@nestjs/cqrs';
import {DeletePermissionCommand} from '../impl/delete-permission.command';
import {PermissionRepository} from '../../repository/permission.repository';
import {Logger, NotFoundException} from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { PermissionDeletedFailedEvent } from 'permissions/events/impl/permission-deleted.event';

@CommandHandler(DeletePermissionCommand)
export class DeletePermissionHandler implements ICommandHandler<DeletePermissionCommand> {
    constructor(
        private readonly repository: PermissionRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: DeletePermissionCommand) {
        Logger.log('Async DeletePermissionHandler...', 'DeletePermissionCommand');
        const {streamId, permissionIdDto} = command;
        const permissionId = permissionIdDto._id;

        try {
            const permission = await getMongoRepository(PermissionDto).findOne({ _id: permissionId });
            if (!permission) {
                throw new NotFoundException(`Permission with _id ${permissionId} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const permissionModel = this.publisher.mergeObjectContext(
                await this.repository.deletePermission(streamId, permissionId)
            );
            permissionModel.commit();
        } catch (error) {
            this.eventBus.publish(new PermissionDeletedFailedEvent(streamId, permissionId, error));
        }
    }
}
