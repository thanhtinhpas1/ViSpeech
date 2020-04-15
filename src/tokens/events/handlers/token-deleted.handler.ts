import {Logger, NotFoundException, Inject} from '@nestjs/common';
import {EventsHandler, IEventHandler, EventBus} from '@nestjs/cqrs';
import {InjectRepository} from '@nestjs/typeorm';
import {TokenDto} from 'tokens/dtos/tokens.dto';
import {TokenDeletedByUserIdEvent, TokenDeletedEvent, TokenDeletedSuccessEvent, TokenDeletedFailedEvent, TokenDeletedByUserIdSuccessEvent, TokenDeletedByUserIdFailedEvent} from '../impl/token-deleted.event';
import {Repository} from 'typeorm';
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
        const {streamId, tokenId} = event;

        try {
            const token = await this.repository.findOne({_id: tokenId});
            if (!token) {
                throw new NotFoundException(`Token with _id ${tokenId} does not exist.`);
            }
            await this.repository.delete({_id: tokenId});
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
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.TOKEN_DELETED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'TokenDeletedFailedEvent');
    }
}

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
            await this.repository.delete({userId});
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