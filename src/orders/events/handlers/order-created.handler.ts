import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
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

  async handle(event: OrderCreatedEvent) {
    try {
      Logger.log(event, "OrderCreatedEvent");
      const order = event.orderDto;
      return await this.repository.save(order);
    } catch (error) {
      Logger.error(error, "", "OrderCreatedEvent");
    }
  }
}
