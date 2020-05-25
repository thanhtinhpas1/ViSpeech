import {CommandHandler, EventPublisher, ICommandHandler, EventBus} from '@nestjs/cqrs';
import {UpdateTokenCommand} from '../impl/update-token.command';
import {TokenRepository} from '../../repository/token.repository';
import {Logger, NotFoundException} from '@nestjs/common';
import { TokenUpdatedFailedEvent } from 'tokens/events/impl/token-updated.event';
import { getMongoRepository } from 'typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';

@CommandHandler(UpdateTokenCommand)
export class UpdateTokenHandler implements ICommandHandler<UpdateTokenCommand> {
    constructor(
        private readonly repository: TokenRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: UpdateTokenCommand) {
        Logger.log('Async UpdateTokenHandler...', 'UpdateTokenCommand');
        const {streamId, tokenDto} = command;

        try {
            const token = await getMongoRepository(TokenDto).findOne({ _id: tokenDto._id });
            if (!token) {
                throw new NotFoundException(`Token with _id ${tokenDto._id} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const tokenModel = this.publisher.mergeObjectContext(
                await this.repository.updateToken(streamId, tokenDto)
            );
            tokenModel.commit();
        } catch (error) {
            this.eventBus.publish(new TokenUpdatedFailedEvent(streamId, tokenDto, error));
        }
    }
}
