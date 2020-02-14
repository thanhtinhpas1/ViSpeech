import { EventPublisher, ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { CreateOrderCommand } from "../impl/create-order.command";
import { OrderRepository } from "../../repository/order.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly repository: OrderRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateOrderCommand) {
    Logger.log("Async CreateOrderHandler...", "CreateOrderCommand");

    const { orderDto } = command;
    // use mergeObjectContext for dto dispatch events
    const order = this.publisher.mergeObjectContext(
      await this.repository.createOrder(orderDto)
    );
    order.commit();
  }
}
