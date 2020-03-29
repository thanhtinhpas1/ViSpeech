import { FindOrderQuery } from 'orders/queries/impl/find-order.query';
import { GetOrdersQuery } from 'orders/queries/impl/get-orders.query';
import { OrderDto, OrderIdRequestParamsDto } from '../dtos/orders.dto';
import { OrdersService } from '../services/orders.service';
import { GetOrdersByUserIdQuery } from 'orders/queries/impl/get-orders-by-userId';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(orderDto: OrderDto): Promise<OrderDto>;
    updateOrder(orderIdDto: OrderIdRequestParamsDto, orderDto: OrderDto): Promise<any>;
    deleteOrder(orderIdDto: OrderIdRequestParamsDto): Promise<any>;
    getOrders(getOrdersQuery: GetOrdersQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    findOneOrder(findOrderQuery: FindOrderQuery): Promise<OrderDto>;
    getOrdersByUserId(getOrdersByUserIdQuery: GetOrdersByUserIdQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    getPaymentIntent(body: any): Promise<{
        clientSecret: any;
    }>;
}
