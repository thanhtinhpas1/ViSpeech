import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetOrdersByUserIdQuery } from "../impl/get-orders-by-userId";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderDto } from "orders/dtos/orders.dto";

@QueryHandler(GetOrdersByUserIdQuery)
export class GetOrdersByUserIdHandler
  implements IQueryHandler<GetOrdersByUserIdQuery> {
  constructor(
    @InjectRepository(OrderDto)
    private readonly repository: Repository<OrderDto>
  ) {}

  async execute(query: GetOrdersByUserIdQuery): Promise<any> {
    Logger.log("Async GetOrdersByUserIdQuery...", "GetOrdersByUserIdQuery");
    const { userId, offset, limit } = query;
    try {
      if (limit && offset) {
        return await this.repository.find({
          skip: offset,
          take: limit,
          where: { userId }
        });
      }
      return await this.repository.find({
        where: { userId }
      });
    } catch (error) {
      Logger.error(error, "", "GetOrdersByUserIdQuery");
    }
  }
}
