import {CommandHandler, EventPublisher, ICommandHandler, EventBus} from '@nestjs/cqrs';
import {DeleteTokenCommand} from '../impl/delete-token.command';
import {TokenRepository} from '../../repository/token.repository';
import {Logger, NotFoundException} from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { TokenDeletedFailedEvent } from 'tokens/events/impl/token-deleted.event';

@CommandHandler(DeleteTokenCommand)
export class DeleteTokenHandler implements ICommandHandler<DeleteTokenCommand> {
    constructor(
        private readonly repository: TokenRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: DeleteTokenCommand) {
        Logger.log('Async DeleteTokenHandler...', 'DeleteTokenCommand');
        const {streamId, tokenIdDto} = command;
        const tokenId = tokenIdDto._id;

        try {
            const token = await getMongoRepository(TokenDto).findOne({ _id: tokenId });
            if (!token) {
                throw new NotFoundException(`Token with _id ${tokenId} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const tokenModel = this.publisher.mergeObjectContext(
                await this.repository.deleteToken(streamId, tokenIdDto._id)
            );
            tokenModel.commit();
        } catch (error) {
            this.eventBus.publish(new TokenDeletedFailedEvent(streamId, tokenId, error));
        }
    }
}
