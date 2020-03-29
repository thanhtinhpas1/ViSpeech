import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../impl/update-user.command';
import { UserRepository } from '../../repository/user.repository';
export declare class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: UserRepository, publisher: EventPublisher);
    execute(command: UpdateUserCommand): Promise<void>;
}
