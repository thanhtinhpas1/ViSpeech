import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePermissionCommand } from '../impl/update-permission.command';
import { PermissionRepository } from '../../repository/permission.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { PermissionUpdatedFailedEvent } from 'permissions/events/impl/permission-updated.event';

@CommandHandler(UpdatePermissionCommand)
export class UpdatePermissionHandler implements ICommandHandler<UpdatePermissionCommand> {
    constructor(
        private readonly repository: PermissionRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: UpdatePermissionCommand) {
        Logger.log('Async UpdatePermissionHandler...', 'UpdatePermissionCommand');
        const { streamId, permissionDto } = command;

        try {
            const permission = await getMongoRepository(PermissionDto).findOne({ _id: permissionDto._id });
            if (!permission) {
                throw new NotFoundException(`Permission with _id ${permissionDto._id} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const permissionModel = this.publisher.mergeObjectContext(
                await this.repository.updatePermission(streamId, permissionDto)
            );
            permissionModel.commit();
        } catch (error) {
            this.eventBus.publish(new PermissionUpdatedFailedEvent(streamId, permissionDto, error));
        }
    }
}
