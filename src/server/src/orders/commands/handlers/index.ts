import { CreateOrderHandler } from './create-order.handler';
import { DeleteOrderHandler } from './delete-order.handler';
import { UpdateOrderHandler } from './update-order.handler';
import { WelcomeOrderHandler } from './welcome-order.handler';
import { CreateUpgradeTokenOrderHandler } from './create-upgrade-token-order.handler';

export const CommandHandlers = [
    CreateOrderHandler,
    CreateUpgradeTokenOrderHandler,
    DeleteOrderHandler,
    UpdateOrderHandler,
    WelcomeOrderHandler
];
