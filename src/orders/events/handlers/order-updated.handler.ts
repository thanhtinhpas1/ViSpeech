import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import {
  OrderUpdatedEvent
} from "../impl/order-updated.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDto } from "orders/dtos/orders.dto";
import { Repository } from "typeorm";
import { Utils } from "utils";

@EventsHandler(OrderUpdatedEvent)
export class OrderUpdatedHandler implements IEventHandler<OrderUpdatedEvent> {
  constructor(
    @InjectRepository(OrderDto)
    private readonly repository: Repository<OrderDto>
  ) { }

  async handle(event: OrderUpdatedEvent) {
    Logger.log(event.orderDto._id, "OrderUpdatedEvent"); // write here
    const { streamId, orderDto } = event;
    const { _id, ...orderInfo } = orderDto;

    try {
      const formattedOrderInfo = Utils.removePropertiesFromObject(orderInfo, ['tokenTypeId']);
      return await this.repository.update({ _id }, formattedOrderInfo);
    } catch (error) {
      Logger.error(error, "", "OrderUpdatedEvent");
    }
  }
}
