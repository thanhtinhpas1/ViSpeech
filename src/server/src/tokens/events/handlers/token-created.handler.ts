import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
import { Utils } from 'utils';
import { config } from '../../../../config';
import { TokenCreatedEvent, TokenCreatedFailedEvent, TokenCreatedSuccessEvent } from '../impl/token-created.event';

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
        const { streamId, tokenDto } = event;
        let token = JSON.parse(JSON.stringify(tokenDto));
        let tokenTypeDto = null;

        try {
            if (token.tokenTypeId) {
                tokenTypeDto = await this.repositoryTokenType.findOne({ _id: token.tokenTypeId });
            } else if (token.tokenType) {
                tokenTypeDto = await this.repositoryTokenType.findOne({ name: token.tokenType });
            }
            token.tokenTypeId = tokenTypeDto._id;
            token.tokenType = tokenTypeDto.name;
            token.minutes = Number(tokenTypeDto.minutes);
            token.usedMinutes = 0;
            token.isValid = Utils.convertToBoolean(token.isValid);
            token = Utils.removePropertiesFromObject(token, ['orderId']);
            await this.repository.save(token);
            this.eventBus.publish(new TokenCreatedSuccessEvent(streamId, tokenDto));
        } catch (error) {
            this.eventBus.publish(new TokenCreatedFailedEvent(streamId, tokenDto, error));
        }
    }
}

@EventsHandler(TokenCreatedSuccessEvent)
export class TokenCreatedSuccessHandler implements IEventHandler<TokenCreatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: TokenCreatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.TOKEN_CREATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.tokenDto._id, 'TokenCreatedSuccessEvent');
    }
}

@EventsHandler(TokenCreatedFailedEvent)
export class TokenCreatedFailedHandler implements IEventHandler<TokenCreatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: TokenCreatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.TOKEN_CREATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'TokenCreatedFailedEvent');
    }
}
