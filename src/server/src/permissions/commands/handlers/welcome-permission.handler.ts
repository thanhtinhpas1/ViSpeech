import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { WelcomePermissionCommand } from '../impl/welcome-permission.command';
import { PermissionRepository } from '../../repository/permission.repository';
import { Logger } from '@nestjs/common';

@CommandHandler(WelcomePermissionCommand)
export class WelcomePermissionHandler
    implements ICommandHandler<WelcomePermissionCommand> {
    constructor(
        private readonly repository: PermissionRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: WelcomePermissionCommand) {
        Logger.log('Async WelcomePermissionHandler...', 'WelcomePermissionCommand');
        const {streamId, permissionId} = command;
        const permission = this.publisher.mergeObjectContext(
            await this.repository.welcomePermission(streamId, permissionId)
        );
        permission.commit();
    }
}
