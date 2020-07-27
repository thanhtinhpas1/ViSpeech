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
import { TokenDto } from 'tokens/dtos/tokens.dto';
import {
    OrderToUpgradeCreatedEvent,
    OrderToUpgradeCreatedFailedEvent,
    OrderToUpgradeCreatedSuccessEvent
} from '../impl/order-to-upgrade-created.event';

@EventsHandler(OrderToUpgradeCreatedEvent)
export class OrderToUpgradeCreatedHandler implements IEventHandler<OrderToUpgradeCreatedEvent> {
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

    async handle(event: OrderToUpgradeCreatedEvent) {
        Logger.log(event.orderDto._id, 'OrderToUpgradeCreatedEvent');
        const { streamId, orderDto } = event;
        const order = { ...orderDto };

        try {
            order.tokenType = await this.tokenTypeRepository.findOne({ _id: order.tokenType._id });
            order.token = await this.tokenRepository.findOne({ _id: order.token._id });
            order.upgradeToken = true;
            await this.repository.save(order);
            this.eventBus.publish(new OrderToUpgradeCreatedSuccessEvent(streamId, orderDto));
        } catch (error) {
            this.eventBus.publish(new OrderToUpgradeCreatedFailedEvent(streamId, orderDto, error));
        }
    }
}

@EventsHandler(OrderToUpgradeCreatedSuccessEvent)
export class OrderToUpgradeCreatedSuccessHandler
    implements IEventHandler<OrderToUpgradeCreatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: OrderToUpgradeCreatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.ORDER_TO_UPGRADE_CREATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.orderDto._id, 'OrderToUpgradeCreatedSuccessEvent');
    }
}

@EventsHandler(OrderToUpgradeCreatedFailedEvent)
export class OrderToUpgradeCreatedFailedHandler
    implements IEventHandler<OrderToUpgradeCreatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: OrderToUpgradeCreatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.ORDER_TO_UPGRADE_CREATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'OrderToUpgradeCreatedFailedEvent');
    }
}
