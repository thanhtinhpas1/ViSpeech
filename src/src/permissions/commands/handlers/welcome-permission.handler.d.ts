import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { WelcomePermissionCommand } from '../impl/welcome-permission.command';
import { PermissionRepository } from '../../repository/permission.repository';
export declare class WelcomePermissionHandler implements ICommandHandler<WelcomePermissionCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: PermissionRepository, publisher: EventPublisher);
    execute(command: WelcomePermissionCommand): Promise<void>;
}
