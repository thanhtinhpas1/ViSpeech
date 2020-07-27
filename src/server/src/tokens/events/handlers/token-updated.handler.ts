import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
import { TokenUpdatedEvent, TokenUpdatedFailedEvent, TokenUpdatedSuccessEvent } from '../impl/token-updated.event';
import { ClientKafka } from '@nestjs/microservices';
import { config } from '../../../../config';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';

@EventsHandler(TokenUpdatedEvent)
export class TokenUpdatedHandler implements IEventHandler<TokenUpdatedEvent> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: TokenUpdatedEvent) {
        Logger.log(event.tokenDto._id, 'TokenUpdatedEvent'); // write here
        const { streamId, tokenDto } = event;
        const { _id, ...tokenInfo } = tokenDto;

        try {
            // Can only update usedMinutes
            await this.repository.update({ _id }, {
                usedMinutes: Number(tokenInfo.usedMinutes),
                updatedDate: new Date()
            });
            this.eventBus.publish(new TokenUpdatedSuccessEvent(streamId, tokenDto));
        } catch (error) {
            this.eventBus.publish(new TokenUpdatedFailedEvent(streamId, tokenDto, error));
        }
    }
}

@EventsHandler(TokenUpdatedSuccessEvent)
export class TokenUpdatedSuccessHandler implements IEventHandler<TokenUpdatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: TokenUpdatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.TOKEN_UPDATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.tokenDto._id, 'TokenUpdatedSuccessEvent');
    }
}

@EventsHandler(TokenUpdatedFailedEvent)
export class TokenUpdatedFailedHandler implements IEventHandler<TokenUpdatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: TokenUpdatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.TOKEN_UPDATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'TokenUpdatedFailedEvent');
    }
}
