import { CreateOrderHandler } from './create-order.handler';
import { CreateOrderToUpgradeHandler } from './create-order-to-upgrade.handler';
import { DeleteOrderHandler } from './delete-order.handler';
import { UpdateOrderHandler } from './update-order.handler';
import { WelcomeOrderHandler } from './welcome-order.handler';

export const CommandHandlers = [
    CreateOrderHandler,
    CreateOrderToUpgradeHandler,
    DeleteOrderHandler,
    UpdateOrderHandler,
    WelcomeOrderHandler
];
