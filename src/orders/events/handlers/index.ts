import {OrderCreatedFailedHandler, OrderCreatedHandler, OrderCreatedSuccessHandler, OrderCreationStartedHandler} from './order-created.handler';
import {OrderUpdatedHandler} from './order-updated.handler';
import {OrderDeletedHandler} from './order-deleted.handler';
import {OrderWelcomedHandler} from './order-welcomed.handler';

export const EventHandlers = [
    // create
    OrderCreationStartedHandler,
    OrderCreatedHandler,
    OrderCreatedSuccessHandler,
    OrderCreatedFailedHandler,

    OrderUpdatedHandler,
    OrderDeletedHandler,
    OrderWelcomedHandler
];
