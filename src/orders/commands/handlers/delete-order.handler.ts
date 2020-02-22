import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { DeleteOrderCommand } from "../impl/delete-order.command";
import { OrderRepository } from "../../repository/order.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand> {
  constructor(
    private readonly repository: OrderRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: DeleteOrderCommand) {
    Logger.log("Async DeleteOrderHandler...", "DeleteOrderCommand");
    const { orderIdDto } = command;
    const order = this.publisher.mergeObjectContext(
      await this.repository.deleteOrder(orderIdDto.id)
    );
    order.commit();
  }
}
