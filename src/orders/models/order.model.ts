import { AggregateRoot } from "@nestjs/cqrs";
import { OrderCreatedEvent, OrderCreationStartedEvent } from "../events/impl/order-created.event";
import { OrderUpdatedEvent } from "../events/impl/order-updated.event";
import { OrderDeletedEvent } from "../events/impl/order-deleted.event";
import { OrderWelcomedEvent } from "../events/impl/order-welcomed.event";
import { OrderDto } from "orders/dtos/orders.dto";
import { Logger } from "@nestjs/common";

export class Order extends AggregateRoot {
  [x: string]: any;

  constructor(private readonly id: string | undefined) {
    super();
  }

  setData(data) {
    this.data = data;
  }

  createOrderStart(transactionId: string) {
    this.apply(new OrderCreationStartedEvent(transactionId, this.data));
  }

  createOrder(transactionId: string) {
    this.apply(new OrderCreatedEvent(transactionId, this.data));
  }

  updateOrder(transactionId: string) {
    this.apply(new OrderUpdatedEvent(transactionId, this.data));
  }

  welcomeOrder() {
    this.apply(new OrderWelcomedEvent(this.id));
  }

  deleteOrder() {
    this.apply(new OrderDeletedEvent(this.id));
  }
}
