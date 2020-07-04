import { CreateOrderHandler } from './create-order.handler';
import { DeleteOrderHandler } from './delete-order.handler';
import { UpdateOrderHandler } from './update-order.handler';
import { WelcomeOrderHandler } from './welcome-order.handler';

export const CommandHandlers = [
    CreateOrderHandler,
    DeleteOrderHandler,
    UpdateOrderHandler,
    WelcomeOrderHandler
];
