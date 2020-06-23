import { ICommand } from '@nestjs/cqrs';
import { OrderIdRequestParamsDto } from '../../dtos/orders.dto';

export class DeleteOrderCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly orderIdDto: OrderIdRequestParamsDto) {
    }
}
