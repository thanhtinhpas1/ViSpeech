import { IEventHandler } from '@nestjs/cqrs';
import { OrderDeletedEvent } from '../impl/order-deleted.event';
import { OrderDto } from 'orders/dtos/orders.dto';
import { Repository } from 'typeorm';
export declare class OrderDeletedHandler implements IEventHandler<OrderDeletedEvent> {
    private readonly repository;
    constructor(repository: Repository<OrderDto>);
    handle(event: OrderDeletedEvent): Promise<void>;
}
