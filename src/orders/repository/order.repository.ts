import { Injectable, Logger } from "@nestjs/common";
import { Order } from "../models/order.model";
import { OrderDto } from "orders/dtos/orders.dto";

@Injectable()
export class OrderRepository {
  async createOrderStart(transactionId: string, orderDto: OrderDto) {
    const order = new Order(undefined);
    order.setData(orderDto);
    order.createOrderStart(transactionId);
    return order;
  }

  async createOrder(transactionId: string, orderDto: OrderDto) {
    const order = new Order(undefined);
    order.setData(orderDto);
    order.createOrder(transactionId);
    return order;
  }

  async updateOrder(transactionId: string, orderDto: OrderDto) {
    const order = new Order(undefined);
    order.setData(orderDto);
    order.updateOrder(transactionId);
    return order;
  }

  async deleteOrder(orderId: string) {
    const order = new Order(orderId);
    order.deleteOrder();
    return order;
  }

  async welcomeOrder(orderId: string) {
    const order = new Order(orderId);
    order.welcomeOrder();
    return order;
  }
}
