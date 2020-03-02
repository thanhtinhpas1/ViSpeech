import { Injectable } from "@nestjs/common";
import { Order } from "../models/order.model";
import { OrderDto } from "orders/dtos/orders.dto";

@Injectable()
export class OrderRepository {
  async createOrder(orderDto: OrderDto) {
    const order = new Order(undefined);
    order.setData(orderDto);
    order.createOrder();
    return order;
  }

  async updateOrder(orderDto: OrderDto) {
    const order = new Order(undefined);
    order.setData(orderDto);
    order.updateOrder();
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
