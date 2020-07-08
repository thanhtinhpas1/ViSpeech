import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from '../../dtos/orders.dto';
import { Repository } from 'typeorm';
import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { OrderUpdatedFailedEvent, OrderUpdatedSuccessEvent } from '../impl/order-updated.event';
import { OrderUpdatedStatusEvent } from '../impl/order-updated-status..event';
import { config } from '../../../../config';
import { ClientKafka } from '@nestjs/microservices';
import { CONSTANTS } from '../../../common/constant';
import { Utils } from '../../../utils';

@EventsHandler(OrderUpdatedStatusEvent)
export class OrderUpdatedStatusHandler implements IEventHandler<OrderUpdatedStatusEvent> {
    constructor(
        @InjectRepository(OrderDto)
        private readonly repository: Repository<OrderDto>,
        private readonly eventBus: EventBus
    ) {
    }

    async handle(event: OrderUpdatedStatusEvent) {
        Logger.log(event.orderId, 'OrderUpdatedStatusEvent'); // write here
        const {streamId, orderId, status} = event;

        try {
            const order = await this.repository.findOne({_id: orderId});
            if (order) {
                await this.repository.save({...order, status});
            } else {
                throw new NotFoundException('Order not found.');
            }
            this.eventBus.publish(new OrderUpdatedSuccessEvent(streamId, order));
        } catch (error) {
            this.eventBus.publish(new OrderUpdatedFailedEvent(streamId, null, error));
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
        this.clientKafka.emit(CONSTANTS.TOPICS.ORDER_DELETED_SUCCESS_EVENT, JSON.stringify(event));
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
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.ORDER_DELETED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'OrderUpdatedFailedEvent');
    }
}
