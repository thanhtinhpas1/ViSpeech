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
    Logger.log(event.orderDto._id, "OrderCreationStartedEvent");
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
    Logger.log(event.orderDto._id, "OrderCreatedEvent");
    const order = event.orderDto;

    try {
      const tokenTypeDto = await getMongoRepository(TokenTypeDto).findOne({
        _id: order.tokenTypeId.toString()
      });
      order.minutes = tokenTypeDto.minutes;
      order.price = tokenTypeDto.price;
      const newOrder = await this.repository.insert(order);
      this.eventBus.publish(new OrderCreatedSuccessEvent(newOrder));
    } catch (error) {
      this.eventBus.publish(new OrderCreatedFailedEvent(error));
    }
  }
}

@EventsHandler(OrderCreatedSuccessEvent)
export class OrderCreatedSuccessHandler
  implements IEventHandler<OrderCreatedSuccessEvent> {
  handle(event: OrderCreatedSuccessEvent) {
    Logger.log(event.orderDto._id, "OrderCreatedSuccessEvent");
  }
}

@EventsHandler(OrderCreatedFailedEvent)
export class OrderCreatedFailedHandler
  implements IEventHandler<OrderCreatedFailedEvent> {
  handle(event: OrderCreatedFailedEvent) {
    Logger.log(event.error, "OrderCreatedFailedEvent");
  }
}
