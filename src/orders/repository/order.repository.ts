import { Injectable } from "@nestjs/common";
import { Order } from "../models/order.model";

@Injectable()
export class OrderRepository {
  async createOrder(orderDto) {
    const order = new Order(orderDto._id);
    order.setData(orderDto);
    order.createOrder();
    return order;
  }

  async updateOrder(orderDto) {
    const order = new Order(orderDto._id);
    order.setData(orderDto);
    order.updateOrder();
    return order;
  }

  async deleteOrder(orderId) {
    const order = new Order(orderId);
    order.deleteOrder();
    return order;
  }

  async welcomeOrder(orderId) {
    const order = new Order(orderId);
    order.welcomeOrder();
    return order;
  }
}
