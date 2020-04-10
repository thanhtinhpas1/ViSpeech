import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { OrderDto } from 'orders/dtos/orders.dto';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { Repository } from 'typeorm';
import { config } from '../../../../config';
import { OrderCreatedEvent, OrderCreatedFailedEvent, OrderCreatedSuccessEvent, OrderCreationStartedEvent } from '../impl/order-created.event';

@EventsHandler(OrderCreationStartedEvent)
export class OrderCreationStartedHandler
    implements IEventHandler<OrderCreationStartedEvent> {
    handle(event: OrderCreationStartedEvent) {
        Logger.log(event.orderDto._id, 'OrderCreationStartedEvent');
    }
}

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
    constructor(
        @InjectRepository(OrderDto)
        private readonly repository: Repository<OrderDto>,
        @InjectRepository(TokenTypeDto)
        private readonly tokenTypeRepository: Repository<TokenTypeDto>,
        private readonly eventBus: EventBus
    ) {
    }

    async handle(event: OrderCreatedEvent) {
        Logger.log(event.orderDto._id, 'OrderCreatedEvent');
        const { streamId, orderDto } = event;
        const order = JSON.parse(JSON.stringify(orderDto));

        try {
            const tokenTypeDto = await this.tokenTypeRepository.findOne({ _id: order.tokenType._id });
            if (!tokenTypeDto) throw new NotFoundException(`Token type with _id ${order.tokenType._id} does not exist.`);
            order.tokenType = tokenTypeDto;
            await this.repository.save(order);
            this.eventBus.publish(new OrderCreatedSuccessEvent(streamId, orderDto));
        } catch (error) {
            this.eventBus.publish(new OrderCreatedFailedEvent(streamId, orderDto, error));
        }
    }
}

@EventsHandler(OrderCreatedSuccessEvent)
export class OrderCreatedSuccessHandler
    implements IEventHandler<OrderCreatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: OrderCreatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.ORDER_CREATED_SUCCESS_EVENT, event);
        Logger.log(event.orderDto._id, 'OrderCreatedSuccessEvent');
    }
}

@EventsHandler(OrderCreatedFailedEvent)
export class OrderCreatedFailedHandler
    implements IEventHandler<OrderCreatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: OrderCreatedFailedEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.ORDER_CREATED_FAILED_EVENT, event);
        Logger.log(event.error, 'OrderCreatedFailedEvent');
    }
}
