import { ICommand } from '@nestjs/cqrs';
import { OrderDto, PaymentIntent, } from '../../dtos/orders.dto';

export class CreateOrderToUpgradeCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly orderDto: OrderDto,
        public readonly paymentIntent: PaymentIntent,
    ) {
    }
}