import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TokenRepository } from '../../repository/token.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { UpgradeTokenCommand } from '../impl/upgrade-token.command';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenUpgradedFailedEvent } from 'tokens/events/impl/token-upgraded.event';

@CommandHandler(UpgradeTokenCommand)
export class UpgradeTokenHandler implements ICommandHandler<UpgradeTokenCommand> {
    constructor(
        private readonly repository: TokenRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: UpgradeTokenCommand) {
        Logger.log('Async UpgradeTokenHandler...', 'UpgradeTokenCommand');
        const { streamId, tokenDto, tokenTypeDto } = command;

        try {
            const token = await getMongoRepository(TokenDto).findOne({ _id: tokenDto._id });
            if (!token) {
                throw new NotFoundException(`Token with _id ${tokenDto._id} does not exist.`);
            }

            const tokenType = await getMongoRepository(TokenTypeDto).findOne({ name: tokenTypeDto.name });
            if (!tokenType) {
                throw new NotFoundException(`Token type with name ${tokenTypeDto.name} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const tokenModel = this.publisher.mergeObjectContext(
                await this.repository.upgradeToken(streamId, tokenDto, tokenType)
            );
            tokenModel.commit();
        } catch (error) {
            this.eventBus.publish(new TokenUpgradedFailedEvent(streamId, tokenDto, tokenTypeDto, error));
        }
    }
}
