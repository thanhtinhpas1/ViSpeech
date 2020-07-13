import { IEvent } from '@nestjs/cqrs';
import { OrderDto } from 'orders/dtos/orders.dto';

export class OrderToUpgradeCreatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: OrderDto
    ) {
    }
}

export class OrderToUpgradeCreatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: any
    ) {
    }
}

export class OrderToUpgradeCreatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: OrderDto,
        public readonly error: object
    ) {
    }
}
