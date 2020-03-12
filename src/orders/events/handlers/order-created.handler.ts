import { EventsHandler, IEventHandler, EventBus } from "@nestjs/cqrs";
import {
  OrderCreatedEvent,
  OrderCreationStartedEvent,
  OrderCreatedSuccessEvent,
  OrderCreatedFailedEvent
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
    private readonly repository: Repository<OrderDto>,
    private readonly eventBus: EventBus
  ) {}

  async handle(event: OrderCreatedEvent) {
    Logger.log(event, "OrderCreatedEvent");
    const order = event.orderDto;
    const transactionId = event.transactionId;

    try {
      const tokenTypeDto = await getMongoRepository(TokenTypeDto).find({
        _id: order.tokenTypeId.toString()
      });
      order.minutes = tokenTypeDto[0].minutes;
      order.price = tokenTypeDto[0].price;
      order.transactionId = transactionId;
      await this.repository.save(order);
      this.eventBus.publish(new OrderCreatedSuccessEvent(transactionId, order));
    } catch (error) {
      this.eventBus.publish(new OrderCreatedFailedEvent(transactionId, error));
    }
  }
}

@EventsHandler(OrderCreatedSuccessEvent)
export class OrderCreatedSuccessHandler
  implements IEventHandler<OrderCreatedSuccessEvent> {
  handle(event: OrderCreatedSuccessEvent) {
    // Logger.log(event, "OrderCreatedSuccessEvent");
  }
}

@EventsHandler(OrderCreatedFailedEvent)
export class OrderCreatedFailedHandler
  implements IEventHandler<OrderCreatedFailedEvent> {
  handle(event: OrderCreatedFailedEvent) {
    // Logger.log(event, "OrderCreatedFailedEvent");
  }
}
