import { GetOrdersHandler } from './get-orders.handler';
import { GetOrdersByUserIdHandler } from './get-orders-by-userId.handler';
import { FindOrderHandler } from './find-order.handler';
import { FindOrderByTokenIdHandler } from './find-order-by-tokenId.handler';

export const QueryHandlers = [
    GetOrdersHandler,
    GetOrdersByUserIdHandler,
    FindOrderHandler,
    FindOrderByTokenIdHandler
];
