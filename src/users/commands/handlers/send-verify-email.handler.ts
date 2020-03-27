import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repository/user.repository';
import { Logger } from '@nestjs/common';
import { SendVerifyEmailCommand } from '../impl/send-verify-email.command';

@CommandHandler(SendVerifyEmailCommand)
export class SendVerifyEmailHandler implements ICommandHandler<SendVerifyEmailCommand> {
    constructor(
        private readonly repository: UserRepository,
        private readonly publisher: EventPublisher
    ) { }

    async execute(command: SendVerifyEmailCommand) {
        Logger.log("Async SendVerifyEmailHandler...", "SendVerifyEmailCommand");

        const { streamId, userIdDto } = command;
        const user = this.publisher.mergeObjectContext(
            await this.repository.sendVerifyEmail(streamId, userIdDto._id)
        );
        user.commit();
    }
}
