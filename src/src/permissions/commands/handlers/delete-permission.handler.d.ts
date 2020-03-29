import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeletePermissionCommand } from '../impl/delete-permission.command';
import { PermissionRepository } from '../../repository/permission.repository';
export declare class DeletePermissionHandler implements ICommandHandler<DeletePermissionCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: PermissionRepository, publisher: EventPublisher);
    execute(command: DeletePermissionCommand): Promise<void>;
}
