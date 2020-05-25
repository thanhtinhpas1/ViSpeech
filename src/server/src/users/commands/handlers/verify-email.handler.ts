import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {UserRepository} from '../../repository/user.repository';
import {Logger} from '@nestjs/common';
import {VerifyEmailCommand} from '../impl/verify-email.command';

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler implements ICommandHandler<VerifyEmailCommand> {
    constructor(
        private readonly repository: UserRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: VerifyEmailCommand) {
        Logger.log('Async VerifyEmailHandler...', 'VerifyEmailCommand');

        const {streamId, emailToken} = command;
        const user = this.publisher.mergeObjectContext(
            await this.repository.verifyEmail(streamId, emailToken)
        );
        user.commit();
    }
}
