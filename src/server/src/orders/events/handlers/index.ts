import { OrderCreatedFailedHandler, OrderCreatedHandler, OrderCreatedSuccessHandler } from './order-created.handler';
import { OrderUpdatedFailedHandler, OrderUpdatedHandler, OrderUpdatedSuccessHandler } from './order-updated.handler';
import { OrderDeletedFailedHandler, OrderDeletedHandler, OrderDeletedSuccessHandler } from './order-deleted.handler';
import { OrderWelcomedHandler } from './order-welcomed.handler';
import {
    UpgradeTokenOrderCreatedFailedHandler,
    UpgradeTokenOrderCreatedHandler,
    UpgradeTokenOrderCreatedSuccessHandler
} from './upgrade-token-order-created.handler';

export const EventHandlers = [
    // create
    OrderCreatedHandler,
    OrderCreatedSuccessHandler,
    OrderCreatedFailedHandler,

    // create upgrade token order
    UpgradeTokenOrderCreatedHandler,
    UpgradeTokenOrderCreatedSuccessHandler,
    UpgradeTokenOrderCreatedFailedHandler,

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
