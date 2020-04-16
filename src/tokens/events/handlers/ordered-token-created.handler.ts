import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import {
    OrderedTokenCreatedEvent,
    OrderedTokenCreatedFailedEvent,
    OrderedTokenCreatedSuccessEvent
} from '../impl/ordered-token-created.event';
import { Utils } from 'utils';
import { config } from '../../../../config';
import { ClientKafka } from '@nestjs/microservices';
import { CONSTANTS } from 'common/constant';

@EventsHandler(OrderedTokenCreatedEvent)
export class OrderedTokenCreatedHandler implements IEventHandler<OrderedTokenCreatedEvent> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        @InjectRepository(TokenTypeDto)
        private readonly repositoryTokenType: Repository<TokenTypeDto>,
        private readonly eventBus: EventBus,
    ) {
    }

    async handle(event: OrderedTokenCreatedEvent) {
        Logger.log(event.tokenDto._id, 'OrderedTokenCreatedEvent');
        const { streamId, tokenDto } = event;
        let token = JSON.parse(JSON.stringify(tokenDto));
        let tokenTypeDto = null;

        try {
            if (token.tokenTypeId) {
                tokenTypeDto = await this.repositoryTokenType.findOne({ _id: token.tokenTypeId });
                if (!tokenTypeDto) {
                    throw new NotFoundException(`Token type with _id ${token.tokenTypeId} does not exist.`);
                }
            } else if (token.tokenType) {
                tokenTypeDto = await this.repositoryTokenType.findOne({ name: token.tokenType });
            }
            token.tokenTypeId = tokenTypeDto._id;
            token.minutes = tokenTypeDto.minutes;
            token = Utils.removePropertiesFromObject(token, ['tokenType', 'orderId']);
            await this.repository.save(token);
            this.eventBus.publish(new OrderedTokenCreatedSuccessEvent(streamId, tokenDto));
        } catch (error) {
            this.eventBus.publish(new OrderedTokenCreatedFailedEvent(streamId, tokenDto, error));
        }
    }
}

@EventsHandler(OrderedTokenCreatedSuccessEvent)
export class OrderedTokenCreatedSuccessHandler
    implements IEventHandler<OrderedTokenCreatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: OrderedTokenCreatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.ORDERED_TOKEN_CREATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.tokenDto._id, 'OrderedTokenCreatedSuccessEvent');
    }
}

@EventsHandler(OrderedTokenCreatedFailedEvent)
export class OrderedTokenCreatedFailedHandler
    implements IEventHandler<OrderedTokenCreatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: OrderedTokenCreatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.ORDERED_TOKEN_CREATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'OrderedTokenCreatedFailedEvent');
    }
}
