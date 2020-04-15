import {Logger, NotFoundException, Inject} from '@nestjs/common';
import {EventsHandler, IEventHandler, EventBus} from '@nestjs/cqrs';
import {InjectRepository} from '@nestjs/typeorm';
import {TokenTypeDto} from 'tokens/dtos/token-types.dto';
import {TokenDto} from 'tokens/dtos/tokens.dto';
import {Repository} from 'typeorm';
import {TokenUpdatedEvent, TokenUpdatedSuccessEvent, TokenUpdatedFailedEvent} from '../impl/token-updated.event';
import { ClientKafka } from '@nestjs/microservices';
import { config } from '../../../../config';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';

@EventsHandler(TokenUpdatedEvent)
export class TokenUpdatedHandler implements IEventHandler<TokenUpdatedEvent> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        @InjectRepository(TokenTypeDto)
        private readonly repositoryTokenType: Repository<TokenTypeDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: TokenUpdatedEvent) {
        Logger.log(event.tokenDto._id, 'TokenUpdatedEvent'); // write here
        const {streamId, tokenDto} = event;
        const {_id, ...tokenInfo} = tokenDto;
        // let tokenTypeDto = null;

        try {
            // if (tokenInfo.tokenTypeId) {
            //     tokenTypeDto = await this.repositoryTokenType.findOne({_id: tokenInfo.tokenTypeId});
            //     if (!tokenTypeDto) {
            //         throw new NotFoundException(`Token type with _id ${tokenInfo.tokenTypeId} does not exist.`);
            //     }
            // } else if (tokenInfo.tokenType) {
            //     tokenTypeDto = await this.repositoryTokenType.findOne({name: tokenInfo.tokenType});
            // }
            // tokenInfo.minutes = tokenTypeDto.minutes;
            const token = await this.repository.findOne({ _id });
            if (!token) {
                throw new NotFoundException(`Token with _id ${_id} does not exist.`);
            }

            // Can only update usedMinutes
            await this.repository.update({_id}, { usedMinutes: Number(tokenInfo.usedMinutes) });
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
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.TOKEN_UPDATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'TokenUpdatedFailedEvent');
    }
}
