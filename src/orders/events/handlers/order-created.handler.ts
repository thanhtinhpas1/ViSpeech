import { IEventHandler, EventsHandler } from "@nestjs/cqrs";
import { OrderCreatedEvent } from "../impl/order-created.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDto } from "orders/dtos/orders.dto";
import { Repository } from "typeorm";

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  constructor(
    @InjectRepository(OrderDto)
    private readonly repository: Repository<OrderDto>
  ) {}

  handle(event: OrderCreatedEvent) {
    Logger.log(event, "OrderCreatedEvent");
    const order = event.orderDto[0];
    this.repository.save(order);
  }
}
