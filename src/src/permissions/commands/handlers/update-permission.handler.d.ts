import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePermissionCommand } from '../impl/update-permission.command';
import { PermissionRepository } from '../../repository/permission.repository';
export declare class UpdatePermissionHandler implements ICommandHandler<UpdatePermissionCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: PermissionRepository, publisher: EventPublisher);
    execute(command: UpdatePermissionCommand): Promise<void>;
}
