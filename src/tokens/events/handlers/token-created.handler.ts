import {EventBus, EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {TokenCreatedEvent, TokenCreatedFailedEvent, TokenCreatedSuccessEvent} from '../impl/token-created.event';
import {Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TokenTypeDto} from 'tokens/dtos/token-types.dto';
import {TokenDto} from 'tokens/dtos/tokens.dto';
import {Repository} from 'typeorm';
import {Utils} from 'utils';

@EventsHandler(TokenCreatedEvent)
export class TokenCreatedHandler implements IEventHandler<TokenCreatedEvent> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        @InjectRepository(TokenTypeDto)
        private readonly repositoryTokenType: Repository<TokenTypeDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: TokenCreatedEvent) {
        Logger.log(event.tokenDto._id, 'TokenCreatedEvent');
        const {streamId, tokenDto} = event;
        let token = JSON.parse(JSON.stringify(tokenDto));
        let tokenTypeDto = null;

        try {
            if (token.tokenTypeId) {
                tokenTypeDto = await this.repositoryTokenType.findOne({_id: token.tokenTypeId});
                if (!tokenTypeDto) {
                    throw new NotFoundException(`Token type with _id ${token.tokenTypeId} does not exist.`);
                }
            } else if (token.tokenType) {
                tokenTypeDto = await this.repositoryTokenType.findOne({name: token.tokenType});
            }
            token.tokenTypeId = tokenTypeDto._id;
            token.minutes = tokenTypeDto.minutes;
            token = Utils.removePropertiesFromObject(token, ['tokenType', 'orderId']);
            await this.repository.save(token);
            this.eventBus.publish(new TokenCreatedSuccessEvent(streamId, tokenDto));
        } catch (error) {
            this.eventBus.publish(new TokenCreatedFailedEvent(streamId, tokenDto, error));
        }
    }
}

@EventsHandler(TokenCreatedSuccessEvent)
export class TokenCreatedSuccessHandler implements IEventHandler<TokenCreatedSuccessEvent> {
    handle(event: TokenCreatedSuccessEvent) {
        Logger.log(event.tokenDto._id, 'TokenCreatedSuccessEvent');
    }
}

@EventsHandler(TokenCreatedFailedEvent)
export class TokenCreatedFailedHandler
    implements IEventHandler<TokenCreatedFailedEvent> {
    handle(event: TokenCreatedFailedEvent) {
        Logger.log(event.error, 'TokenCreatedFailedEvent');
    }
}
