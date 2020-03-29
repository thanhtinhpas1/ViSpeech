import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PermissionRepository } from '../../repository/permission.repository';
import { ReplyPermissionAssignCommand } from '../impl/reply-permission-assign.command';
export declare class ReplyPermissionAssignHandler implements ICommandHandler<ReplyPermissionAssignCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: PermissionRepository, publisher: EventPublisher);
    execute(command: ReplyPermissionAssignCommand): Promise<void>;
}
