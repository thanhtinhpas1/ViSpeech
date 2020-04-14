import {EventsHandler, IEventHandler, EventBus} from '@nestjs/cqrs';
import {OrderDeletedEvent, OrderDeletedSuccessEvent, OrderDeletedFailedEvent} from '../impl/order-deleted.event';
import {Logger, NotFoundException, Inject} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { config } from '../../../../config';
import {OrderDto} from 'orders/dtos/orders.dto';
import {Repository} from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { CONSTANTS } from 'common/constant';

@EventsHandler(OrderDeletedEvent)
export class OrderDeletedHandler implements IEventHandler<OrderDeletedEvent> {
    constructor(
        @InjectRepository(OrderDto)
        private readonly repository: Repository<OrderDto>,
        private readonly eventBus: EventBus
    ) {
    }

    async handle(event: OrderDeletedEvent) {
        Logger.log(event.orderId, 'OrderDeletedEvent');
        const {streamId, orderId} = event;

        try {
            const order = await this.repository.findOne({_id: orderId});
            if (!order) {
                throw new NotFoundException(`Order with _id ${orderId} does not exist.`);
            }
            await this.repository.delete({_id: orderId});
            this.eventBus.publish(new OrderDeletedSuccessEvent(streamId, orderId));
        } catch (error) {
            this.eventBus.publish(new OrderDeletedFailedEvent(streamId, orderId, error));
        }
    }
}

@EventsHandler(OrderDeletedSuccessEvent)
export class OrderDeletedSuccessHandler
    implements IEventHandler<OrderDeletedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: OrderDeletedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.ORDER_DELETED_SUCCESS_EVENT, event);
        Logger.log(event.orderId, 'OrderDeletedSuccessEvent');
    }
}

@EventsHandler(OrderDeletedFailedEvent)
export class OrderDeletedFailedHandler
    implements IEventHandler<OrderDeletedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: OrderDeletedFailedEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.ORDER_DELETED_FAILED_EVENT, event);
        Logger.log(event.error, 'OrderDeletedFailedEvent');
    }
}
