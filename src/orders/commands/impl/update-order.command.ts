import { ICommand } from "@nestjs/cqrs";
import { OrderDto } from "../../dtos/orders.dto";

export class UpdateOrderCommand implements ICommand {
  constructor(
    public readonly transactionId: string,
    public readonly orderDto: OrderDto
  ) {}
}
