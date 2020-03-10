import { OrderCreatedHandler, OrderCreationStartedHandler, OrderCreatedSuccessHandler, OrderCreatedFailHandler } from "./order-created.handler";
import { OrderUpdatedHandler } from "./order-updated.handler";
import { OrderDeletedHandler } from "./order-deleted.handler";
import { OrderWelcomedHandler } from "./order-welcomed.handler";

export const EventHandlers = [
  OrderCreationStartedHandler,
  OrderCreatedHandler,
  OrderCreatedSuccessHandler,
  OrderCreatedFailHandler,
  OrderUpdatedHandler,
  OrderDeletedHandler,
  OrderWelcomedHandler
];
