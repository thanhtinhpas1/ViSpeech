import {Logger, Inject} from '@nestjs/common';
import {EventsHandler, IEventHandler, EventBus} from '@nestjs/cqrs';
import {InjectRepository} from '@nestjs/typeorm';
import {TokenDto} from 'tokens/dtos/tokens.dto';
import {Repository, getMongoRepository} from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { config } from '../../../../config';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';
import { TokenDeletedByUserIdEvent, TokenDeletedByUserIdSuccessEvent, TokenDeletedByUserIdFailedEvent } from '../impl/token-deleted-by-userId.event';

@EventsHandler(TokenDeletedByUserIdEvent)
export class TokenDeletedByUserIdHandler implements IEventHandler<TokenDeletedByUserIdEvent> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: TokenDeletedByUserIdEvent) {
        Logger.log(event.streamId, 'TokenDeletedByUserIdEvent');
        const {streamId, userId} = event;

        try {
            await getMongoRepository(TokenDto).updateMany({ userId }, { $set: { isValid: false }});
            this.eventBus.publish(new TokenDeletedByUserIdSuccessEvent(streamId, userId));
        } catch (error) {
            this.eventBus.publish(new TokenDeletedByUserIdFailedEvent(streamId, userId, error));
        }
    }
}

@EventsHandler(TokenDeletedByUserIdSuccessEvent)
export class TokenDeletedByUserIdSuccessHandler
    implements IEventHandler<TokenDeletedByUserIdSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: TokenDeletedByUserIdSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.TOKEN_DELETED_BY_USERID_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.userId, 'TokenDeletedByUserIdSuccessEvent');
    }
}

@EventsHandler(TokenDeletedByUserIdFailedEvent)
export class TokenDeletedByUserIdFailedHandler
    implements IEventHandler<TokenDeletedByUserIdFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: TokenDeletedByUserIdFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.TOKEN_DELETED_BY_USERID_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'TokenDeletedByUserIdFailedEvent');
    }
}