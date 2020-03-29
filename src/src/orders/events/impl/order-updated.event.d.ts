import { IEvent } from '@nestjs/cqrs';
import { OrderDto } from '../../dtos/orders.dto';
export declare class OrderUpdatedEvent implements IEvent {
    readonly streamId: string;
    readonly orderDto: OrderDto;
    constructor(streamId: string, orderDto: OrderDto);
}
