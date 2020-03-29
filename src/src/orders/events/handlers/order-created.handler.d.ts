import { EventBus, IEventHandler } from '@nestjs/cqrs';
import { OrderCreatedEvent, OrderCreatedFailedEvent, OrderCreatedSuccessEvent, OrderCreationStartedEvent } from '../impl/order-created.event';
import { OrderDto } from 'orders/dtos/orders.dto';
import { Repository } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
export declare class OrderCreationStartedHandler implements IEventHandler<OrderCreationStartedEvent> {
    handle(event: OrderCreationStartedEvent): void;
}
export declare class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
    private readonly repository;
    private readonly tokenTypeRepository;
    private readonly eventBus;
    constructor(repository: Repository<OrderDto>, tokenTypeRepository: Repository<TokenTypeDto>, eventBus: EventBus);
    handle(event: OrderCreatedEvent): Promise<void>;
}
export declare class OrderCreatedSuccessHandler implements IEventHandler<OrderCreatedSuccessEvent> {
    handle(event: OrderCreatedSuccessEvent): void;
}
export declare class OrderCreatedFailedHandler implements IEventHandler<OrderCreatedFailedEvent> {
    handle(event: OrderCreatedFailedEvent): void;
}
