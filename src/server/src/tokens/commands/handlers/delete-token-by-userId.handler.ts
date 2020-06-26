import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TokenRepository } from '../../repository/token.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { DeleteTokenByUserIdCommand } from '../impl/delete-token-by-userId.command';
import { getMongoRepository } from 'typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { TokenDeletedByUserIdFailedEvent } from 'tokens/events/impl/token-deleted-by-userId.event';

@CommandHandler(DeleteTokenByUserIdCommand)
export class DeleteTokenByUserIdHandler implements ICommandHandler<DeleteTokenByUserIdCommand> {
    constructor(
        private readonly repository: TokenRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus,
    ) {
    }

    async execute(command: DeleteTokenByUserIdCommand) {
        Logger.log('Async DeleteTokenByUserIdHandler...', 'DeleteTokenByUserIdCommand');
        const {streamId, userId} = command;

        try {
            const tokens = await getMongoRepository(TokenDto).find({userId});
            if (tokens.length === 0) {
                throw new NotFoundException(`Token with userId ${userId} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const tokenModel = this.publisher.mergeObjectContext(
                await this.repository.deleteTokenByUserId(streamId, userId)
            );
            tokenModel.commit();
        } catch (error) {
            this.eventBus.publish(new TokenDeletedByUserIdFailedEvent(streamId, userId, error));
        }
    }
}
