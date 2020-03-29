import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OrderDto, OrderIdRequestParamsDto } from '../dtos/orders.dto';
import { GetOrdersQuery } from 'orders/queries/impl/get-orders.query';
import { FindOrderQuery } from 'orders/queries/impl/find-order.query';
import { GetOrdersByUserIdQuery } from 'orders/queries/impl/get-orders-by-userId';
export declare class OrdersService {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    createOrderStart(streamId: string, orderDto: OrderDto): Promise<any>;
    createOrder(streamId: string, orderDto: OrderDto): Promise<any>;
    updateOrder(streamId: string, orderDto: OrderDto): Promise<any>;
    deleteOrder(streamId: string, orderIdDto: OrderIdRequestParamsDto): Promise<any>;
    getOrders(getOrdersQuery: GetOrdersQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    getOrdersByUserId(getOrdersByUserIdQuery: GetOrdersByUserIdQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    findOne(findOrderQuery: FindOrderQuery): Promise<OrderDto>;
    getPaymentIntent(amount: string): Promise<any>;
}
