import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PermissionRepository } from '../../repository/permission.repository';
import { Logger, BadRequestException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { UpdatePermissionExpirationDateCommand } from '../impl/update-permission-expiration-date.command';
import { CONSTANTS } from 'common/constant';
import { PermissionExpirationDateUpdatedFailedEvent } from 'permissions/events/impl/permission-expiration-date-updated.event';

@CommandHandler(UpdatePermissionExpirationDateCommand)
export class UpdatePermissionExpirationDateHandler implements ICommandHandler<UpdatePermissionExpirationDateCommand> {
    constructor(
        private readonly repository: PermissionRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: UpdatePermissionExpirationDateCommand) {
        Logger.log('Async UpdatePermissionExpirationDateHandler...', 'UpdatePermissionExpirationDateCommand');
        const { streamId, assigneePermissionDto, expiresIn } = command;
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
                await this.repository.updatePermissionExpirationDate(streamId, assigneePermissionDto, expiresIn)
            );
            permissionModel.commit();
        } catch (error) {
            this.eventBus.publish(new PermissionExpirationDateUpdatedFailedEvent(streamId, assigneePermissionDto, expiresIn, error));
        }
    }
}
