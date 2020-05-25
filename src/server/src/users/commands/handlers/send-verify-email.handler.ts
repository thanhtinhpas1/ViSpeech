import {CommandHandler, EventPublisher, ICommandHandler, EventBus} from '@nestjs/cqrs';
import {UserRepository} from '../../repository/user.repository';
import {Logger, NotFoundException} from '@nestjs/common';
import {SendVerifyEmailCommand} from '../impl/send-verify-email.command';
import { getMongoRepository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { VerifyEmailSentFailedEvent } from 'users/events/impl/verify-email-sent.event';

@CommandHandler(SendVerifyEmailCommand)
export class SendVerifyEmailHandler implements ICommandHandler<SendVerifyEmailCommand> {
    constructor(
        private readonly repository: UserRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus,
    ) {
    }

    async execute(command: SendVerifyEmailCommand) {
        Logger.log('Async SendVerifyEmailHandler...', 'SendVerifyEmailCommand');
        const {streamId, userIdDto} = command;
        const userId = userIdDto._id;

        try {
            const user = await getMongoRepository(UserDto).findOne({ _id: userId });
            if (!user) {
                throw new NotFoundException(`User with _id ${userId} does not exist.`);
            }

            const userModel = this.publisher.mergeObjectContext(
                await this.repository.sendVerifyEmail(streamId, userId)
            );
            userModel.commit();
        } catch (error) {
            this.eventBus.publish(new VerifyEmailSentFailedEvent(streamId, userId, error));
        }
    }
}
