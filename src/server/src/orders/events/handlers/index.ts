import {OrderCreatedFailedHandler, OrderCreatedHandler, OrderCreatedSuccessHandler} from './order-created.handler';
import {OrderUpdatedHandler, OrderUpdatedSuccessHandler, OrderUpdatedFailedHandler} from './order-updated.handler';
import {OrderDeletedHandler, OrderDeletedSuccessHandler, OrderDeletedFailedHandler} from './order-deleted.handler';
import {OrderWelcomedHandler} from './order-welcomed.handler';

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