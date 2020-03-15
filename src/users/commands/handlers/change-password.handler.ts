import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {UserRepository} from '../../repository/user.repository';
import {ChangePasswordCommand} from '../impl/change-password.command';
import {Logger} from '@nestjs/common';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler implements ICommandHandler<ChangePasswordCommand> {
    constructor(
        private readonly repository: UserRepository,
        private readonly publisher: EventPublisher,
    ) {
    }

    async execute(command: ChangePasswordCommand) {
        Logger.log('Async ChangePasswordHandler', 'ChangePasswordCommand');
        const {userId, newPassword, oldPassword} = command;
        const user = this.publisher.mergeObjectContext(
            await this.repository.changePassword(userId, newPassword, oldPassword),
        );
        return user.commit();
    }
}