import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { config } from '../../../../config';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';
import { TokenUpgradedEvent, TokenUpgradedFailedEvent, TokenUpgradedSuccessEvent } from '../impl/token-upgraded.event';

@EventsHandler(TokenUpgradedEvent)
export class TokenUpgradedHandler implements IEventHandler<TokenUpgradedEvent> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: TokenUpgradedEvent) {
        Logger.log(event.tokenDto._id, 'TokenUpgradedEvent'); // write here
        const { streamId, tokenDto, tokenTypeDto } = event;

        try {
            await this.repository.update({ _id: tokenDto._id }, {
                minutes: Number(tokenDto.minutes || 0),
                tokenTypeId: tokenDto.tokenTypeId,
                tokenType: tokenDto.tokenType,
                updatedDate: new Date()
            });
            this.eventBus.publish(new TokenUpgradedSuccessEvent(streamId, tokenDto, tokenTypeDto));
        } catch (error) {
            Logger.error(error.message)
            this.eventBus.publish(new TokenUpgradedFailedEvent(streamId, tokenDto, tokenTypeDto, error));
        }
    }
}

@EventsHandler(TokenUpgradedSuccessEvent)
export class TokenUpgradedSuccessHandler implements IEventHandler<TokenUpgradedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: TokenUpgradedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.TOKEN_UPGRADED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.tokenDto._id, 'TokenUpgradedSuccessEvent');
    }
}

@EventsHandler(TokenUpgradedFailedEvent)
export class TokenUpgradedFailedHandler implements IEventHandler<TokenUpgradedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: TokenUpgradedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.TOKEN_UPGRADED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'TokenUpgradedFailedEvent');
    }
}
