import { OrderCreatedHandler, OrderCreationStartedHandler } from './order-created.handler';
import { OrderUpdatedHandler } from './order-updated.handler';
import { OrderDeletedHandler } from './order-deleted.handler';
import { OrderWelcomedHandler } from './order-welcomed.handler';
export declare const EventHandlers: (typeof OrderCreationStartedHandler | typeof OrderCreatedHandler | typeof OrderUpdatedHandler | typeof OrderDeletedHandler | typeof OrderWelcomedHandler)[];
