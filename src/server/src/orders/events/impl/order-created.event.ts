import { IEvent } from '@nestjs/cqrs';
import { OrderDto } from 'orders/dtos/orders.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Permission } from 'permissions/dtos/permissions.dto';

export class OrderCreatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: OrderDto,
        public readonly tokenDto: TokenDto,
        public readonly assigneeTokens: Permission[]
    ) {
    }
}

export class OrderCreatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: OrderDto,
        public readonly tokenDto: TokenDto,
        public readonly assigneeTokens: Permission[]
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
