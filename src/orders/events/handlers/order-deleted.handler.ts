import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {OrderDeletedEvent} from '../impl/order-deleted.event';
import {Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {OrderDto} from 'orders/dtos/orders.dto';
import {Repository} from 'typeorm';

@EventsHandler(OrderDeletedEvent)
export class OrderDeletedHandler implements IEventHandler<OrderDeletedEvent> {
    constructor(
        @InjectRepository(OrderDto)
        private readonly repository: Repository<OrderDto>
    ) {
    }

    async handle(event: OrderDeletedEvent) {
        Logger.log(event.orderId, 'OrderDeletedEvent');
        const {streamId, orderId} = event;

        try {
            const order = await this.repository.findOne({_id: orderId});
            if (order) {
                await this.repository.delete({_id: orderId});
                return;
            }
            throw new NotFoundException(`Order with _id ${orderId} does not exist.`);
        } catch (error) {
            Logger.error(error, '', 'OrderDeletedEvent');
        }
    }
}
