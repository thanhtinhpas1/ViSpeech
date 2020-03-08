import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import {
  OrderCreatedEvent,
  OrderCreationStartedEvent
} from "../impl/order-created.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDto } from "orders/dtos/orders.dto";
import { Repository, getMongoRepository } from "typeorm";
import { TokenTypeDto } from "tokens/dtos/token-types.dto";

@EventsHandler(OrderCreationStartedEvent)
export class OrderCreationStartedHandler
  implements IEventHandler<OrderCreationStartedEvent> {
  handle(event: OrderCreationStartedEvent) {
    Logger.log(event.transactionId, "OrderCreationStartedEvent");
  }
}

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  constructor(
    @InjectRepository(OrderDto)
    private readonly repository: Repository<OrderDto>
  ) {}

  async handle(event: OrderCreatedEvent) {
    try {
      Logger.log(event.transactionId, "OrderCreatedEvent");
      const order = event.orderDto;
      const transactionId = event.transactionId;
      const tokenTypeDto = await getMongoRepository(TokenTypeDto).find({
        _id: order.tokenTypeId.toString()
      });
      order.minutes = tokenTypeDto[0].minutes;
      order.price = tokenTypeDto[0].price;
      order.transactionId = transactionId;
      return await this.repository.save(order);
    } catch (error) {
      Logger.error(error, "", "OrderCreatedEvent");
    }
  }
}
