import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { OrderIdRequestParamsDto } from "../dtos/orders.dto";
import { OrderDto } from "../dtos/orders.dto";
import { CreateOrderCommand } from "../commands/impl/create-order.command";
import { UpdateOrderCommand } from "../commands/impl/update-order.command";
import { DeleteOrderCommand } from "../commands/impl/delete-order.command";
import { GetOrdersQuery } from "orders/queries/impl/get-orders.query";
import { FindOrderQuery } from "orders/queries/impl/find-order.query";

@Injectable()
export class OrdersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async createOrder(orderDto: OrderDto) {
    return await this.commandBus.execute(new CreateOrderCommand(orderDto));
  }

  async updateOrder(orderDto: OrderDto) {
    return await this.commandBus.execute(new UpdateOrderCommand(orderDto));
  }

  async deleteOrder(orderId: OrderIdRequestParamsDto) {
    return await this.commandBus.execute(new DeleteOrderCommand(orderId));
  }

  async findOrders(getOrdersQuery: GetOrdersQuery) {
    var query = new GetOrdersQuery();
    Object.assign(query, getOrdersQuery);
    return await this.queryBus.execute(query);
  }

  async findOne(findOrderQuery: FindOrderQuery): Promise<OrderDto> {
    var query = new FindOrderQuery();
    Object.assign(query, findOrderQuery);
    return await this.queryBus.execute(query);
  }
}
