import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderUpdatedEvent, OrderUpdatedFailedEvent, OrderUpdatedSuccessEvent } from '../impl/order-updated.event';
import { Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'orders/dtos/orders.dto';
import { Repository } from 'typeorm';
import { Utils } from 'utils';
import { config } from '../../../../config';
import { ClientKafka } from '@nestjs/microservices';
import { CONSTANTS } from 'common/constant';

@EventsHandler(OrderUpdatedEvent)
export class OrderUpdatedHandler implements IEventHandler<OrderUpdatedEvent> {
    constructor(
        @InjectRepository(OrderDto)
        private readonly repository: Repository<OrderDto>,
        private readonly eventBus: EventBus
    ) {
    }

    async handle(event: OrderUpdatedEvent) {
        Logger.log(event.orderDto._id, 'OrderUpdatedEvent'); // write here
        const { streamId, orderDto } = event;
        const { _id, ...orderInfo } = orderDto;

        try {
            let formattedOrderInfo = Utils.removePropertiesFromObject(orderInfo, ['userId', 'tokenType', 'upgradeToken']);
            if (orderInfo.upgradeToken) {
                formattedOrderInfo = Utils.removePropertyFromObject(formattedOrderInfo, 'token');
            }
            await this.repository.update({ _id }, { ...formattedOrderInfo, updatedDate: new Date() });
            this.eventBus.publish(new OrderUpdatedSuccessEvent(streamId, orderDto));
        } catch (error) {
            this.eventBus.publish(new OrderUpdatedFailedEvent(streamId, orderDto, error));
        }
    }
}

@EventsHandler(OrderUpdatedSuccessEvent)
export class OrderUpdatedSuccessHandler
    implements IEventHandler<OrderUpdatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: OrderUpdatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.ORDER_UPDATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.orderDto._id, 'OrderUpdatedSuccessEvent');
    }
}

@EventsHandler(OrderUpdatedFailedEvent)
export class OrderUpdatedFailedHandler
    implements IEventHandler<OrderUpdatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: OrderUpdatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.ORDER_UPDATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'OrderUpdatedFailedEvent');
    }
}
