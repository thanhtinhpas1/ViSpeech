import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {UpdateOrderCommand} from '../impl/update-order.command';
import {OrderRepository} from '../../repository/order.repository';
import {Logger} from '@nestjs/common';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
  constructor(
    private readonly repository: OrderRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateOrderCommand) {
    Logger.log("Async UpdateOrderHandler...", "UpdateOrderCommand");

    const { orderDto } = command;
    const order = this.publisher.mergeObjectContext(
      await this.repository.updateOrder(orderDto)
    );
    order.commit();
  }
}
