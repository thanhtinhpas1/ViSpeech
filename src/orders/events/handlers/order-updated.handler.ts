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
  ) {}

  async handle(event: OrderUpdatedEvent) {
    try {
      Logger.log(event.transactionId, "OrderUpdatedEvent"); // write here
      const { _id, ...orderInfo } = event.orderDto;
      const formattedOrderInfo = Utils.removeNullOrEmptyPropertyOfObj(orderInfo);
      Logger.log(formattedOrderInfo, "OrderUpdatedEvent formattedOrderInfo"); // write here
      return await this.repository.update({ _id }, formattedOrderInfo);
    } catch (error) {
      Logger.error(error, "", "OrderUpdatedEvent");
    }
  }
}
