import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repository/user.repository';
import { SendVerifyEmailCommand } from '../impl/send-verify-email.command';
export declare class SendVerifyEmailHandler implements ICommandHandler<SendVerifyEmailCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: UserRepository, publisher: EventPublisher);
    execute(command: SendVerifyEmailCommand): Promise<void>;
}
