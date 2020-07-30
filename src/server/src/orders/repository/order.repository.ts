import { Injectable } from '@nestjs/common';
import { Order } from '../models/order.model';
import { OrderDto } from 'orders/dtos/orders.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';

@Injectable()
export class OrderRepository {
    async createOrder(streamId: string, orderDto: OrderDto, tokenDto: TokenDto) {
        const order = new Order(streamId);
        order.setData(orderDto);
        order.createOrder(streamId, tokenDto);
        return order;
    }

    async createOrderToUpgrade(streamId: string, orderDto: OrderDto) {
        const order = new Order(streamId);
        order.setData(orderDto);
        order.createOrderToUpgrade(streamId);
        return order;
    }

    async updateOrder(streamId: string, orderDto: OrderDto) {
        const order = new Order(streamId);
        order.setData(orderDto);
        order.updateOrder(streamId);
        return order;
    }

    async deleteOrder(streamId: string, orderId: string) {
        const order = new Order(orderId);
        order.deleteOrder(streamId);
        return order;
    }

    async welcomeOrder(streamId: string, orderId: string) {
        const order = new Order(orderId);
        order.welcomeOrder(streamId);
        return order;
    }
}
