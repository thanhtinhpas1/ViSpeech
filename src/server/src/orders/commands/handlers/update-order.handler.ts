import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrderCommand } from '../impl/update-order.command';
import { OrderRepository } from '../../repository/order.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { OrderDto } from 'orders/dtos/orders.dto';
import { OrderUpdatedFailedEvent } from 'orders/events/impl/order-updated.event';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
    constructor(
        private readonly repository: OrderRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: UpdateOrderCommand) {
        Logger.log('Async UpdateOrderHandler...', 'UpdateOrderCommand');
        const {streamId, orderDto} = command;

        try {
            const order = await getMongoRepository(OrderDto).findOne({_id: orderDto._id});
            if (!order) {
                throw new NotFoundException(`Order with _id ${orderDto._id} does not exist.`);
            }

            const orderModel = this.publisher.mergeObjectContext(
                await this.repository.updateOrder(streamId, orderDto)
            );
            orderModel.commit();
        } catch (error) {
            this.eventBus.publish(new OrderUpdatedFailedEvent(streamId, orderDto, error));
        }
    }
}
