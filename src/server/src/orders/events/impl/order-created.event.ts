import { IEvent } from '@nestjs/cqrs';
import { OrderDto } from 'orders/dtos/orders.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';

export class OrderCreatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: OrderDto,
        public readonly tokenDto: TokenDto,
    ) {
    }
}

export class OrderCreatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: OrderDto,
        public readonly tokenDto: TokenDto,
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
