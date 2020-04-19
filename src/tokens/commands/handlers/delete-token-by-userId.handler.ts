import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {TokenRepository} from '../../repository/token.repository';
import {Logger} from '@nestjs/common';
import { DeleteTokenByUserIdCommand } from '../impl/delete-token-by-userId.command';

@CommandHandler(DeleteTokenByUserIdCommand)
export class DeleteTokenByUserIdHandler implements ICommandHandler<DeleteTokenByUserIdCommand> {
    constructor(
        private readonly repository: TokenRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: DeleteTokenByUserIdCommand) {
        Logger.log('Async DeleteTokenByUserIdHandler...', 'DeleteTokenByUserIdCommand');
        const {streamId, userId} = command;
        const token = this.publisher.mergeObjectContext(
            await this.repository.deleteTokenByUserId(streamId, userId)
        );
        token.commit();
    }
}
