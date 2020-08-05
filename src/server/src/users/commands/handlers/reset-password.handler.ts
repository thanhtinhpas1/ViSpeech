import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repository/user.repository';
import { BadRequestException, Logger } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { ResetPasswordCommand } from '../impl/reset-password.command';
import { PasswordResetFailedEvent } from 'users/events/impl/password-reset.event';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler implements ICommandHandler<ResetPasswordCommand> {
    constructor(
        private readonly repository: UserRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus,
    ) {
    }

    async execute(command: ResetPasswordCommand) {
        Logger.log('Async ResetPasswordHandler', 'ResetPasswordCommand');
        const { streamId, resetPasswordBody } = command;

        try {
            const user = await getMongoRepository(UserDto).findOne({ _id: resetPasswordBody.userId });
            if (!user) {
                throw new BadRequestException(`User with _id ${resetPasswordBody.userId} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const userModel = this.publisher.mergeObjectContext(
                await this.repository.resetPassword(streamId, resetPasswordBody),
            );
            userModel.commit();
        } catch (error) {
            this.eventBus.publish(new PasswordResetFailedEvent(streamId, resetPasswordBody, error));
        }
    }
}