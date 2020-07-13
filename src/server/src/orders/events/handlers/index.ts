import { OrderCreatedFailedHandler, OrderCreatedHandler, OrderCreatedSuccessHandler } from './order-created.handler';
import { OrderUpdatedFailedHandler, OrderUpdatedHandler, OrderUpdatedSuccessHandler } from './order-updated.handler';
import { OrderDeletedFailedHandler, OrderDeletedHandler, OrderDeletedSuccessHandler } from './order-deleted.handler';
import { OrderWelcomedHandler } from './order-welcomed.handler';
import { OrderToUpgradeCreatedHandler, OrderToUpgradeCreatedSuccessHandler, 
    OrderToUpgradeCreatedFailedHandler } from './order-to-upgrade-created.handler';

export const EventHandlers = [
    // create
    OrderCreatedHandler,
    OrderCreatedSuccessHandler,
    OrderCreatedFailedHandler,

    // create order to upgrade token
    OrderToUpgradeCreatedHandler,
    OrderToUpgradeCreatedSuccessHandler,
    OrderToUpgradeCreatedFailedHandler,

    // update
    OrderUpdatedHandler,
    OrderUpdatedSuccessHandler,
    OrderUpdatedFailedHandler,

    // delete
    OrderDeletedHandler,
    OrderDeletedSuccessHandler,
    OrderDeletedFailedHandler,

    OrderWelcomedHandler
];
