import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repository/user.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { VerifyEmailCommand } from '../impl/verify-email.command';
import { JwtService } from '@nestjs/jwt';
import { getMongoRepository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { EmailVerifiedFailedEvent } from 'users/events/impl/email-verified.event';

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler implements ICommandHandler<VerifyEmailCommand> {
    constructor(
        private readonly repository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: VerifyEmailCommand) {
        Logger.log('Async VerifyEmailHandler...', 'VerifyEmailCommand');
        const {streamId, emailToken} = command;

        try {
            const decodedToken = this.jwtService.decode(emailToken);
            const userId = decodedToken['id'];
            const user = await getMongoRepository(UserDto).findOne({_id: userId});
            if (!user) {
                throw new NotFoundException(`User with _id ${userId} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const userModel = this.publisher.mergeObjectContext(
                await this.repository.verifyEmail(streamId, emailToken)
            );
            userModel.commit();
        } catch (error) {
            this.eventBus.publish(new EmailVerifiedFailedEvent(streamId, emailToken, error));
        }
    }
}
