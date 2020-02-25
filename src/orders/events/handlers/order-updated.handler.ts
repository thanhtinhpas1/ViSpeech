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

  async handle(event: OrderUpdatedEvent) {
    try {
      Logger.log(event, "OrderUpdatedEvent"); // write here
      const { id, ...orderInfo } = event.orderDto[0];
      return await this.repository.update(id, orderInfo);
    } catch (error) {
      Logger.error(error, "OrderUpdatedEvent");
    }
  }
}
