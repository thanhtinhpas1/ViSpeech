import { Order } from '../models/order.model';
import { OrderDto } from 'orders/dtos/orders.dto';
export declare class OrderRepository {
    createOrderStart(streamId: string, orderDto: OrderDto): Promise<Order>;
    createOrder(streamId: string, orderDto: OrderDto): Promise<Order>;
    updateOrder(streamId: string, orderDto: OrderDto): Promise<Order>;
    deleteOrder(streamId: string, orderId: string): Promise<Order>;
    welcomeOrder(streamId: string, orderId: string): Promise<Order>;
}
