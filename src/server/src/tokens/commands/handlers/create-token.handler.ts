import { Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateFreeTokenCommand, CreateOrderedTokenCommand, CreateTokenCommand } from '../impl/create-token.command';
import { TokenRepository } from '../../repository/token.repository';
import { AuthService } from 'auth/auth.service';
import { TokenCreatedFailedEvent } from 'tokens/events/impl/token-created.event';
import { getMongoRepository } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { OrderedTokenCreatedFailedEvent } from 'tokens/events/impl/ordered-token-created.event';

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler
    implements ICommandHandler<CreateTokenCommand> {
    constructor(
        private readonly repository: TokenRepository,
        private readonly authService: AuthService,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus,
    ) {
    }

    async execute(command: CreateTokenCommand) {
        Logger.log('Async CreateTokenHandler...', 'CreateTokenCommand');
        const { streamId, tokenDto } = command;

        try {
            if (!tokenDto.tokenType && !tokenDto.tokenTypeId) {
                throw new BadRequestException("Token type or token type id must not be empty.")
            }

            if (tokenDto.tokenTypeId) {
                const tokenTypeDto = await getMongoRepository(TokenTypeDto).findOne({ _id: tokenDto.tokenTypeId });
                if (!tokenTypeDto) {
                    throw new NotFoundException(`Token type with _id ${tokenDto.tokenTypeId} does not exist.`);
                }
            }

            tokenDto.value = this.authService.generateTokenWithUserId(tokenDto.userId);

            // use mergeObjectContext for dto dispatch events
            const token = this.publisher.mergeObjectContext(
                await this.repository.createToken(streamId, tokenDto)
            );
            token.commit();
        } catch (error) {
            this.eventBus.publish(new TokenCreatedFailedEvent(streamId, tokenDto, error));
        }
    }
}

@CommandHandler(CreateFreeTokenCommand)
export class CreateFreeTokenHandler
    implements ICommandHandler<CreateFreeTokenCommand> {
    constructor(
        private readonly repository: TokenRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: CreateFreeTokenCommand) {
        Logger.log('Async CreateFreeTokenHandler...', 'CreateFreeTokenCommand');

        const { streamId, tokenDto } = command;
        // use mergeObjectContext for dto dispatch events
        const token = this.publisher.mergeObjectContext(
            await this.repository.createFreeToken(streamId, tokenDto)
        );
        token.commit();
    }
}

@CommandHandler(CreateOrderedTokenCommand)
export class CreateOrderedTokenHandler
    implements ICommandHandler<CreateOrderedTokenCommand> {
    constructor(
        private readonly repository: TokenRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus,
    ) {
    }

    async execute(command: CreateOrderedTokenCommand) {
        Logger.log('Async CreateOrderedTokenHandler...', 'CreateOrderedTokenCommand');
        const { streamId, tokenDto } = command;

        try {
            if (tokenDto.tokenTypeId) {
                const tokenTypeDto = await getMongoRepository(TokenTypeDto).findOne({ _id: tokenDto.tokenTypeId });
                if (!tokenTypeDto) {
                    throw new NotFoundException(`Token type with _id ${tokenDto.tokenTypeId} does not exist.`);
                }
            }

            // use mergeObjectContext for dto dispatch events
            const token = this.publisher.mergeObjectContext(
                await this.repository.createOrderedToken(streamId, tokenDto)
            );
            token.commit();
        } catch (error) {
            this.eventBus.publish(new OrderedTokenCreatedFailedEvent(streamId, tokenDto, error));
        }
    }
}