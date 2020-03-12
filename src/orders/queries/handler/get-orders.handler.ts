import { GetOrdersQuery } from "../impl/get-orders.query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDto } from "orders/dtos/orders.dto";
import { Repository } from "typeorm";

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(
    @InjectRepository(OrderDto)
    private readonly repository: Repository<OrderDto>
  ) {}

  async execute(query: GetOrdersQuery) {
    try {
      Logger.log("Async GetOrdersQuery...", "GetOrdersQuery");
      if (query.limit && query.offset)
        return await this.repository.find({
          skip: Number(query.offset),
          take: Number(query.limit)
        });
      return this.repository.find();
    } catch (error) {
      Logger.error(error, "", "GetOrdersQuery");
    }
  }
}
