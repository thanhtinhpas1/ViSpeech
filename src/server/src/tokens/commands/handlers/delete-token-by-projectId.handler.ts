import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TokenRepository } from '../../repository/token.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { DeleteTokenByProjectIdCommand } from '../impl/delete-token-by-projectId.command';
import { getMongoRepository } from 'typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { TokenDeletedByProjectIdFailedEvent } from 'tokens/events/impl/token-deleted-by-projectId.event';

@CommandHandler(DeleteTokenByProjectIdCommand)
export class DeleteTokenByProjectIdHandler implements ICommandHandler<DeleteTokenByProjectIdCommand> {
    constructor(
        private readonly repository: TokenRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus,
    ) {
    }

    async execute(command: DeleteTokenByProjectIdCommand) {
        Logger.log('Async DeleteTokenByProjectIdHandler...', 'DeleteTokenByProjectIdCommand');
        const {streamId, projectId} = command;

        try {
            const tokens = await getMongoRepository(TokenDto).find({projectId});
            if (tokens.length === 0) {
                throw new NotFoundException(`Token with projectId ${projectId} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const tokenModel = this.publisher.mergeObjectContext(
                await this.repository.deleteTokenByProjectId(streamId, projectId)
            );
            tokenModel.commit();
        } catch (error) {
            this.eventBus.publish(new TokenDeletedByProjectIdFailedEvent(streamId, projectId, error));
        }
    }
}
