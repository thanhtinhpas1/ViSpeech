import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repository/user.repository';
import { ChangePasswordCommand } from '../impl/change-password.command';
export declare class ChangePasswordHandler implements ICommandHandler<ChangePasswordCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: UserRepository, publisher: EventPublisher);
    execute(command: ChangePasswordCommand): Promise<void>;
}
