import {IEvent} from '@nestjs/cqrs';
import {OrderDto} from 'orders/dtos/orders.dto';

export class OrderCreatedEvent implements IEvent {
  constructor(public readonly orderDto: OrderDto) {}
}
