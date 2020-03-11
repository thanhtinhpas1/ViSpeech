import { IEvent } from "@nestjs/cqrs";
import { OrderDto } from "orders/dtos/orders.dto";

export class OrderCreationStartedEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly orderDto: OrderDto
  ) {}
}

export class OrderCreatedEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly orderDto: OrderDto
  ) {}
}

export class OrderCreatedSuccessEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly orderDto: OrderDto
  ) {}
}

export class OrderCreatedFailedEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly error: object
  ) {}
}
