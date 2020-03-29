import { IEventHandler } from '@nestjs/cqrs';
import { OrderUpdatedEvent } from '../impl/order-updated.event';
import { OrderDto } from 'orders/dtos/orders.dto';
import { Repository } from 'typeorm';
export declare class OrderUpdatedHandler implements IEventHandler<OrderUpdatedEvent> {
    private readonly repository;
    constructor(repository: Repository<OrderDto>);
    handle(event: OrderUpdatedEvent): Promise<import("typeorm").UpdateResult>;
}
