import { IEvent } from '@nestjs/cqrs';
import { OrderDto } from 'orders/dtos/orders.dto';

export class OrderCreatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: OrderDto
    ) {
    }
}

export class OrderCreatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: OrderDto,
    ) {
    }
}

export class OrderCreatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: OrderDto,
        public readonly error: object
    ) {
    }
}
