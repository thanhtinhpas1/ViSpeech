import { ICommand } from "@nestjs/cqrs";
import { OrderDto } from "../../dtos/orders.dto";

export class CreateOrderCommand implements ICommand {
  constructor(public readonly orderDto: OrderDto) {}
}
