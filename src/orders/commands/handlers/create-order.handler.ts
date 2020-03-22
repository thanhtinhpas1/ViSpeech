import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateOrderCommand, CreateOrderStartCommand } from "../impl/create-order.command";
import { OrderRepository } from "../../repository/order.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(CreateOrderStartCommand)
export class CreateOrderStartHandler
  implements ICommandHandler<CreateOrderStartCommand> {
  constructor(
    private readonly repository: OrderRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateOrderStartCommand) {
    Logger.log("Async CreateOrderStartHandler...", "CreateOrderStartCommand");

    const { streamId, orderDto } = command;
    // use mergeObjectContext for dto dispatch events
    const user = this.publisher.mergeObjectContext(
      await this.repository.createOrderStart(streamId, orderDto)
    );
    user.commit();
  }
}

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly repository: OrderRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateOrderCommand) {
    Logger.log("Async CreateOrderHandler...", "CreateOrderCommand");

    const { streamId, orderDto } = command;
    // use mergeObjectContext for dto dispatch events
    const order = this.publisher.mergeObjectContext(
      await this.repository.createOrder(streamId, orderDto)
    );
    order.commit();
  }
}
