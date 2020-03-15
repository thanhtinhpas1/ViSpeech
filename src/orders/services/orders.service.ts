import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { OrderDto, OrderIdRequestParamsDto } from "../dtos/orders.dto";
import { CreateOrderCommand, CreateOrderStartCommand } from "../commands/impl/create-order.command";
import { UpdateOrderCommand } from "../commands/impl/update-order.command";
import { DeleteOrderCommand } from "../commands/impl/delete-order.command";
import { GetOrdersQuery } from "orders/queries/impl/get-orders.query";
import { FindOrderQuery } from "orders/queries/impl/find-order.query";
import { config } from "../../../config";

const stripe = require("stripe")(config.STRIPE_SECRET_KEY);

@Injectable()
export class OrdersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async createOrderStart(orderDto: OrderDto) {
    return await this.commandBus.execute(new CreateOrderStartCommand(orderDto));
  }

  async createOrder(orderDto: OrderDto) {
    return await this.commandBus.execute(new CreateOrderCommand(orderDto));
  }

  async updateOrder(orderDto: OrderDto) {
    return await this.commandBus.execute(new UpdateOrderCommand(orderDto));
  }

  async deleteOrder(orderIdDto: OrderIdRequestParamsDto) {
    return await this.commandBus.execute(new DeleteOrderCommand(orderIdDto));
  }

  async findOrders(getOrdersQuery: GetOrdersQuery) {
    var query = new GetOrdersQuery();
    Object.assign(query, getOrdersQuery);
    return await this.queryBus.execute(query);
  }

  async findOne(findOrderQuery: FindOrderQuery): Promise<OrderDto> {
    var query = new FindOrderQuery(findOrderQuery.id);
    return await this.queryBus.execute(query);
  }

  async getPaymentIntent(amount: string) {
    return await stripe.paymentIntents.create({
      amount: parseInt(amount),
      currency: 'usd'
    });
  }
}
