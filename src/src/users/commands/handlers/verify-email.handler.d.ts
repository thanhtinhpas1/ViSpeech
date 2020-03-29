import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repository/user.repository';
import { VerifyEmailCommand } from '../impl/verify-email.command';
export declare class VerifyEmailHandler implements ICommandHandler<VerifyEmailCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: UserRepository, publisher: EventPublisher);
    execute(command: VerifyEmailCommand): Promise<void>;
}
