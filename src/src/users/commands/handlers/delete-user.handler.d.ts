import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../impl/delete-user.command';
import { UserRepository } from '../../repository/user.repository';
export declare class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: UserRepository, publisher: EventPublisher);
    execute(command: DeleteUserCommand): Promise<void>;
}
