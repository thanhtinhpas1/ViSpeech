import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindOrderQuery } from "../impl/find-order.query";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDto } from "orders/dtos/orders.dto";
import { Repository } from "typeorm";

@QueryHandler(FindOrderQuery)
export class FindOrderHandler implements IQueryHandler<FindOrderQuery> {
  constructor(
    @InjectRepository(OrderDto)
    private readonly repository: Repository<OrderDto>
  ) {}

  async execute(query: FindOrderQuery): Promise<any> {
    Logger.log("Async FindOrderQuery...", "FindOrderQuery");
    try {
      return await this.repository.findOne(query.id);
    } catch (error) {
      Logger.error(error, "", "FindOrderQuery");
    }
  }
}
