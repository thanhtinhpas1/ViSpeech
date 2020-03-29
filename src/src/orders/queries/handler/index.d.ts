import { GetOrdersHandler } from './get-orders.handler';
import { GetOrdersByUserIdHandler } from './get-orders-by-userId.handler';
import { FindOrderHandler } from './find-order.handler';
export declare const QueryHandlers: (typeof GetOrdersHandler | typeof GetOrdersByUserIdHandler | typeof FindOrderHandler)[];
