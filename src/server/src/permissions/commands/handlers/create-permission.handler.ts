import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionCommand } from '../impl/create-permission.command';
import { PermissionRepository } from '../../repository/permission.repository';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler
    implements ICommandHandler<CreatePermissionCommand> {
    constructor(
        private readonly repository: PermissionRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: CreatePermissionCommand) {
        Logger.log('Async CreatePermissionHandler...', 'CreatePermissionCommand');

        const { streamId, permissionDto } = command;
        // use mergeObjectContext for dto dispatch events
        const permission = this.publisher.mergeObjectContext(
            await this.repository.createPermission(streamId, permissionDto)
        );
        permission.commit();
    }
}