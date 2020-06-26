import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repository/user.repository';
import { ChangePasswordCommand } from '../impl/change-password.command';
import { BadRequestException, Logger } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { PasswordChangedFailedEvent } from 'users/events/impl/password-changed.event';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler implements ICommandHandler<ChangePasswordCommand> {
    constructor(
        private readonly repository: UserRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus,
    ) {
    }

    async execute(command: ChangePasswordCommand) {
        Logger.log('Async ChangePasswordHandler', 'ChangePasswordCommand');
        const {streamId, changePasswordBody} = command;

        try {
            const user = await getMongoRepository(UserDto).findOne({_id: changePasswordBody.userId});
            if (!user) {
                throw new BadRequestException(`User with _id ${changePasswordBody.userId} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const userModel = this.publisher.mergeObjectContext(
                await this.repository.changePassword(streamId, changePasswordBody),
            );
            userModel.commit();
        } catch (error) {
            this.eventBus.publish(new PasswordChangedFailedEvent(streamId, changePasswordBody, error));
        }
    }
}