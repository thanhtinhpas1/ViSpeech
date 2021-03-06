import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { TokenDeletedEvent, TokenDeletedFailedEvent, TokenDeletedSuccessEvent } from '../impl/token-deleted.event';
import { Repository } from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { config } from '../../../../config';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';

@EventsHandler(TokenDeletedEvent)
export class TokenDeletedHandler implements IEventHandler<TokenDeletedEvent> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: TokenDeletedEvent) {
        Logger.log(event.tokenId, 'TokenDeletedEvent');
        const { streamId, tokenId } = event;

        try {
            await this.repository.update({ _id: tokenId }, { isValid: false, updatedDate: new Date() });
            this.eventBus.publish(new TokenDeletedSuccessEvent(streamId, tokenId));
        } catch (error) {
            this.eventBus.publish(new TokenDeletedFailedEvent(streamId, tokenId, error));
        }
    }
}

@EventsHandler(TokenDeletedSuccessEvent)
export class TokenDeletedSuccessHandler
    implements IEventHandler<TokenDeletedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: TokenDeletedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.TOKEN_DELETED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.tokenId, 'TokenDeletedSuccessEvent');
    }
}

@EventsHandler(TokenDeletedFailedEvent)
export class TokenDeletedFailedHandler
    implements IEventHandler<TokenDeletedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: TokenDeletedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.TOKEN_DELETED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'TokenDeletedFailedEvent');
    }
}