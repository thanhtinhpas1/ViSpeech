import {OrderCreatedFailedHandler, OrderCreatedHandler, OrderCreatedSuccessHandler} from './order-created.handler';
import {OrderUpdatedHandler, OrderUpdatedSuccessHandler, OrderUpdatedFailedHandler} from './order-updated.handler';
import {OrderDeletedHandler, OrderDeletedSuccessHandler, OrderDeletedFailedHandler} from './order-deleted.handler';
import {OrderWelcomedHandler} from './order-welcomed.handler';
import { UpgradeTokenOrderCreatedHandler, UpgradeTokenOrderCreatedSuccessHandler, UpgradeTokenOrderCreatedFailedHandler } from './upgrade-token-order-created.handler';

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
