import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repository/user.repository';
import { CreateUserCommand } from '../impl/create-user.command';
import { AuthService } from 'auth/auth.service';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { CONSTANTS } from 'common/constant';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly repository: UserRepository,
        private readonly publisher: EventPublisher,
        private readonly authService: AuthService
    ) {
    }

    async execute(command: CreateUserCommand) {
        Logger.log('Async CreateUserHandler...', 'CreateUserCommand');

        const { streamId, userDto } = command;

        // create free token
        const userId = userDto._id;
        const tokenValue = this.authService.generateTokenWithUserId(userId);
        const freeToken = new TokenDto(tokenValue, userId, '', CONSTANTS.TOKEN_TYPE.FREE);

        // use mergeObjectContext for dto dispatch events
        const user = this.publisher.mergeObjectContext(
            await this.repository.createUser(streamId, userDto, freeToken)
        );
        user.commit();
    }
}
