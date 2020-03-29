import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PermissionRepository } from '../../repository/permission.repository';
import { SendAssignPermissionEmailCommand } from '../impl/send-assign-permission-email.command';
export declare class SendAssignPermissionEmailHandler implements ICommandHandler<SendAssignPermissionEmailCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: PermissionRepository, publisher: EventPublisher);
    execute(command: SendAssignPermissionEmailCommand): Promise<void>;
}
