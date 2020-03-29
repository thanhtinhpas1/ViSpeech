import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionCommand } from '../impl/create-permission.command';
import { PermissionRepository } from '../../repository/permission.repository';
export declare class CreatePermissionHandler implements ICommandHandler<CreatePermissionCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: PermissionRepository, publisher: EventPublisher);
    execute(command: CreatePermissionCommand): Promise<void>;
}
