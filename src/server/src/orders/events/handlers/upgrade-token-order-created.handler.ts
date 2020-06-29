import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { OrderDto } from 'orders/dtos/orders.dto';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { Repository } from 'typeorm';
import { config } from '../../../../config';
import { Utils } from 'utils';
import {
    UpgradeTokenOrderCreatedEvent,
    UpgradeTokenOrderCreatedFailedEvent,
    UpgradeTokenOrderCreatedSuccessEvent
} from '../impl/upgrade-token-order-created.event';
import { TokenDto } from 'tokens/dtos/tokens.dto';

@EventsHandler(UpgradeTokenOrderCreatedEvent)
export class UpgradeTokenOrderCreatedHandler implements IEventHandler<UpgradeTokenOrderCreatedEvent> {
    constructor(
        @InjectRepository(OrderDto)
        private readonly repository: Repository<OrderDto>,
        @InjectRepository(TokenTypeDto)
        private readonly tokenTypeRepository: Repository<TokenTypeDto>,
        @InjectRepository(TokenDto)
        private readonly tokenRepository: Repository<TokenDto>,
        private readonly eventBus: EventBus
    ) {
    }

    async handle(event: UpgradeTokenOrderCreatedEvent) {
        Logger.log(event.orderDto._id, 'UpgradeTokenOrderCreatedEvent');
        const {streamId, orderDto} = event;
        const order = {...orderDto};

        try {
            order.tokenType = await this.tokenTypeRepository.findOne({_id: order.tokenType._id});
            order.token = await this.tokenRepository.findOne({_id: order.token._id});
            order.upgradeToken = true;
            await this.repository.save(order);
            this.eventBus.publish(new UpgradeTokenOrderCreatedSuccessEvent(streamId, orderDto));
        } catch (error) {
            this.eventBus.publish(new UpgradeTokenOrderCreatedFailedEvent(streamId, orderDto, error));
        }
    }
}

@EventsHandler(UpgradeTokenOrderCreatedSuccessEvent)
export class UpgradeTokenOrderCreatedSuccessHandler
    implements IEventHandler<UpgradeTokenOrderCreatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: UpgradeTokenOrderCreatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.UPGRADE_TOKEN_ORDER_CREATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.orderDto._id, 'UpgradeTokenOrderCreatedSuccessEvent');
    }
}

@EventsHandler(UpgradeTokenOrderCreatedFailedEvent)
export class UpgradeTokenOrderCreatedFailedHandler
    implements IEventHandler<UpgradeTokenOrderCreatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: UpgradeTokenOrderCreatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.UPGRADE_TOKEN_ORDER_CREATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'UpgradeTokenOrderCreatedFailedEvent');
    }
}
