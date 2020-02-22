import {OrderCreatedHandler} from './order-created.handler';
import {OrderUpdatedHandler} from './order-updated.handler';
import {OrderDeletedHandler} from './order-deleted.handler';
import {OrderWelcomedHandler} from './order-welcomed.handler';

export const EventHandlers = [
  OrderCreatedHandler,
  OrderUpdatedHandler,
  OrderDeletedHandler,
  OrderWelcomedHandler
];
