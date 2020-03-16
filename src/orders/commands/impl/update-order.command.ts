import { ICommand } from "@nestjs/cqrs";
import { OrderDto } from "../../dtos/orders.dto";

export class UpdateOrderCommand implements ICommand {
  constructor(
    public readonly streamId: string,
    public readonly orderDto: OrderDto
  ) {}
}
