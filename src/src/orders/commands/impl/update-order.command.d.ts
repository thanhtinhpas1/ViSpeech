import { ICommand } from '@nestjs/cqrs';
import { OrderDto } from '../../dtos/orders.dto';
export declare class UpdateOrderCommand implements ICommand {
    readonly streamId: string;
    readonly orderDto: OrderDto;
    constructor(streamId: string, orderDto: OrderDto);
}
