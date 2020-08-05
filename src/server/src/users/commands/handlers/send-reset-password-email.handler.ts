import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repository/user.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { VerifyEmailSentFailedEvent } from 'users/events/impl/verify-email-sent.event';
import { SendResetPasswordEmailCommand } from '../impl/send-reset-password-email.command';

@CommandHandler(SendResetPasswordEmailCommand)
export class SendResetPasswordEmailHandler implements ICommandHandler<SendResetPasswordEmailCommand> {
    constructor(
        private readonly repository: UserRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus,
    ) {
    }

    async execute(command: SendResetPasswordEmailCommand) {
        Logger.log('Async SendResetPasswordEmailHandler...', 'SendResetPasswordEmailCommand');
        const { streamId, email } = command;

        try {
            const user = await getMongoRepository(UserDto).findOne({ email });
            if (!user) {
                throw new NotFoundException(`User with email ${email} does not exist.`);
            }

            const userModel = this.publisher.mergeObjectContext(
                await this.repository.sendResetPasswordEmail(streamId, email)
            );
            userModel.commit();
        } catch (error) {
            this.eventBus.publish(new VerifyEmailSentFailedEvent(streamId, email, error));
        }
    }
}
