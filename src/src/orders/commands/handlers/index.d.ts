import { CreateOrderHandler, CreateOrderStartHandler } from './create-order.handler';
import { DeleteOrderHandler } from './delete-order.handler';
import { UpdateOrderHandler } from './update-order.handler';
import { WelcomeOrderHandler } from './welcome-order.handler';
export declare const CommandHandlers: (typeof CreateOrderStartHandler | typeof CreateOrderHandler | typeof DeleteOrderHandler | typeof UpdateOrderHandler | typeof WelcomeOrderHandler)[];
