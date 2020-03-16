import { IEvent } from "@nestjs/cqrs";
import { OrderDto } from "../../dtos/orders.dto";

export class OrderUpdatedEvent implements IEvent {
  constructor(
    public readonly streamId: string,
    public readonly orderDto: OrderDto
  ) {}
}
