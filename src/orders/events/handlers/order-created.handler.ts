import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { OrderCreatedEvent } from "../impl/order-created.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDto } from "orders/dtos/orders.dto";
import { Repository } from "typeorm";
import { UsersService } from "users/services/users.service";
import { FindUserQuery } from "users/queries/impl/find-user.query";

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  constructor(
    @InjectRepository(OrderDto)
    private readonly repository: Repository<OrderDto>,
    private readonly usersService: UsersService
  ) {}

  async handle(event: OrderCreatedEvent) {
    Logger.log(event, "OrderCreatedEvent");
    const order = event.orderDto[0];
    const findUserQuery = new FindUserQuery();
    findUserQuery.id = order.user.id;
    const user = await this.usersService.findOne(findUserQuery);
    order.user = user;
    this.repository.save(order);
  }
}
