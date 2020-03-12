import { CreateOrderHandler, CreateOrderStartHandler } from "./create-order.handler";
import { DeleteOrderHandler } from "./delete-order.handler";
import { UpdateOrderHandler } from "./update-order.handler";
import { WelcomeOrderHandler } from "./welcome-order.handler";

export const CommandHandlers = [
  CreateOrderStartHandler,
  CreateOrderHandler,
  DeleteOrderHandler,
  UpdateOrderHandler,
  WelcomeOrderHandler
];
