import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { OrderUpdatedEvent } from "../impl/order-updated.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDto } from "orders/dtos/orders.dto";
import { Repository } from "typeorm";

@EventsHandler(OrderUpdatedEvent)
export class OrderUpdatedHandler implements IEventHandler<OrderUpdatedEvent> {
  constructor(
    @InjectRepository(OrderDto)
    private readonly repository: Repository<OrderDto>
  ) {}

  handle(event: OrderUpdatedEvent) {
    Logger.log(event, "OrderUpdatedEvent"); // write here
    const { id, ...orderInfo } = event.orderDto[0];
    this.repository.update(id, orderInfo);
  }
}
