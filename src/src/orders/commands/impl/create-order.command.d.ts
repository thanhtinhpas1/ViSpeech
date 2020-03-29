import { ICommand } from '@nestjs/cqrs';
import { OrderDto } from '../../dtos/orders.dto';
export declare class CreateOrderStartCommand implements ICommand {
    readonly streamId: string;
    readonly orderDto: OrderDto;
    constructor(streamId: string, orderDto: OrderDto);
}
export declare class CreateOrderCommand implements ICommand {
    readonly streamId: string;
    readonly orderDto: OrderDto;
    constructor(streamId: string, orderDto: OrderDto);
}
