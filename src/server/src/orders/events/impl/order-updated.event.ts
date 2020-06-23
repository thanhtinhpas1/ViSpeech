import { IEvent } from '@nestjs/cqrs';
import { OrderDto } from '../../dtos/orders.dto';

export class OrderUpdatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: OrderDto
    ) {
    }
}

export class OrderUpdatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: OrderDto
    ) {
    }
}

export class OrderUpdatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: OrderDto,
        public readonly error: object
    ) {
    }
}
