import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { OrderDeletedEvent } from "../impl/order-deleted.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDto } from "orders/dtos/orders.dto";
import { Repository } from "typeorm";

@EventsHandler(OrderDeletedEvent)
export class OrderDeletedHandler implements IEventHandler<OrderDeletedEvent> {
  constructor(
    @InjectRepository(OrderDto)
    private readonly repository: Repository<OrderDto>
  ) {}

  async handle(event: OrderDeletedEvent) {
    try {
      Logger.log(event, "OrderDeletedEvent");
      const orderId = event.orderId;
      return await this.repository.delete({ _id: orderId });
    } catch (error) {
      Logger.error(error, "", "OrderDeletedEvent");
    }
  }
}
