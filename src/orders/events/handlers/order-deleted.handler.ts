import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {OrderDeletedEvent} from '../impl/order-deleted.event';
import {Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {OrderDto} from 'orders/dtos/orders.dto';
import {Repository} from 'typeorm';

@EventsHandler(OrderDeletedEvent)
export class OrderDeletedHandler implements IEventHandler<OrderDeletedEvent> {
  constructor(
    @InjectRepository(OrderDto)
    private readonly repository: Repository<OrderDto>
  ) {}
  handle(event: OrderDeletedEvent) {
    Logger.log(event, "OrderDeletedEvent");
    const orderId = event.orderId[0];
    this.repository.delete(orderId);
  }
}
