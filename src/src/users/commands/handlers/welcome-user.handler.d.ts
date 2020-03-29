import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { WelcomeUserCommand } from '../impl/welcome-user.command';
import { UserRepository } from '../../repository/user.repository';
export declare class WelcomeUserHandler implements ICommandHandler<WelcomeUserCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: UserRepository, publisher: EventPublisher);
    execute(command: WelcomeUserCommand): Promise<void>;
}
