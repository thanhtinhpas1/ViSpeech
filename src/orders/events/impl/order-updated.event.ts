import { IEvent } from "@nestjs/cqrs";
import { OrderDto } from "../../dtos/orders.dto";

export class OrderUpdatedEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly orderDto: OrderDto
  ) {}
}
