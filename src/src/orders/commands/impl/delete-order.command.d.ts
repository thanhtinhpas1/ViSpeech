import { ICommand } from '@nestjs/cqrs';
import { OrderIdRequestParamsDto } from '../../dtos/orders.dto';
export declare class DeleteOrderCommand implements ICommand {
    readonly streamId: string;
    readonly orderIdDto: OrderIdRequestParamsDto;
    constructor(streamId: string, orderIdDto: OrderIdRequestParamsDto);
}
