import { OrderCreatedFailedHandler, OrderCreatedHandler, OrderCreatedSuccessHandler } from './order-created.handler';
import { OrderUpdatedFailedHandler, OrderUpdatedHandler, OrderUpdatedSuccessHandler } from './order-updated.handler';
import { OrderDeletedFailedHandler, OrderDeletedHandler, OrderDeletedSuccessHandler } from './order-deleted.handler';
import { OrderWelcomedHandler } from './order-welcomed.handler';

export const EventHandlers = [
    // create
    OrderCreatedHandler,
    OrderCreatedSuccessHandler,
    OrderCreatedFailedHandler,

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
