import {IEvent} from '@nestjs/cqrs';
import {OrderDto} from 'orders/dtos/orders.dto';

export class UpgradeTokenOrderCreatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: OrderDto
    ) {
    }
}

export class UpgradeTokenOrderCreatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: any
    ) {
    }
}

export class UpgradeTokenOrderCreatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: OrderDto,
        public readonly error: object
    ) {
    }
}
