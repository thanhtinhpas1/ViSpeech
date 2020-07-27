import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeleteOrderCommand } from '../impl/delete-order.command';
import { OrderRepository } from '../../repository/order.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { OrderDto } from 'orders/dtos/orders.dto';
import { OrderDeletedFailedEvent } from 'orders/events/impl/order-deleted.event';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand> {
    constructor(
        private readonly repository: OrderRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: DeleteOrderCommand) {
        Logger.log('Async DeleteOrderHandler...', 'DeleteOrderCommand');
        const { streamId, orderIdDto } = command;
        const orderId = orderIdDto._id;

        try {
            const order = await getMongoRepository(OrderDto).findOne({ _id: orderId });
            if (!order) {
                throw new NotFoundException(`Order with _id ${orderId} does not exist.`);
            }

            const orderModel = this.publisher.mergeObjectContext(
                await this.repository.deleteOrder(streamId, orderId)
            );
            orderModel.commit();
        } catch (error) {
            this.eventBus.publish(new OrderDeletedFailedEvent(streamId, orderId, error));
        }
    }
}
