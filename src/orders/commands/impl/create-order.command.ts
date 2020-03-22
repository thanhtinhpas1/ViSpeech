import { ICommand } from "@nestjs/cqrs";
import { OrderDto } from "../../dtos/orders.dto";

export class CreateOrderStartCommand implements ICommand {
  constructor(
    public readonly streamId: string,
    public readonly orderDto: OrderDto
  ) {}
}

export class CreateOrderCommand implements ICommand {
  constructor(
    public readonly streamId: string,
    public readonly orderDto: OrderDto
  ) {}
}
