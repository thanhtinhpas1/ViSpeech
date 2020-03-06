import { CommandBus, CqrsModule, EventBus, QueryBus } from "@nestjs/cqrs";
import { Module, OnModuleInit } from "@nestjs/common";
import { CommandHandlers } from "./commands/handlers";
import { CommandHandlers as TokenCommandHandlers } from "tokens/commands/handlers";
import { EventHandlers } from "./events/handlers";
import { OrdersSagas } from "./sagas/orders.sagas";
import { OrdersController } from "./controllers/orders.controller";
import { OrdersService } from "./services/orders.service";
import { OrderRepository } from "./repository/order.repository";
import { EventStoreModule } from "../core/event-store/event-store.module";
import { EventStore } from "../core/event-store/event-store";
import { OrderCreatedEvent, OrderCreationStartedEvent } from "./events/impl/order-created.event";
import { OrderDeletedEvent } from "./events/impl/order-deleted.event";
import { OrderUpdatedEvent } from "./events/impl/order-updated.event";
import { OrderWelcomedEvent } from "./events/impl/order-welcomed.event";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDto } from "./dtos/orders.dto";
import { QueryHandlers } from "./queries/handler";
import { TokenRepository } from "tokens/repository/token.repository";
import { AuthModule } from "auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDto]),
    CqrsModule,
    EventStoreModule.forFeature(),
    AuthModule
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersSagas,
    ...CommandHandlers,
    ...TokenCommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    OrderRepository,
    TokenRepository,
  ],
  exports: [OrdersService]
})
export class OrdersModule implements OnModuleInit {
  constructor(
    private readonly command$: CommandBus,
    private readonly query$: QueryBus,
    private readonly event$: EventBus,
    private readonly ordersSagas: OrdersSagas,
    private readonly eventStore: EventStore
  ) {}

  onModuleInit() {
    this.eventStore.setEventHandlers(this.eventHandlers);
    this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
    this.event$.publisher = this.eventStore;
    /** ------------ */
    this.event$.register(EventHandlers);
    this.command$.register(CommandHandlers);
    this.query$.register(QueryHandlers);
    this.event$.registerSagas([OrdersSagas]);
  }

  eventHandlers = {
    OrderCreationStartedEvent: (transactionId, data) => new OrderCreationStartedEvent(transactionId, data),
    OrderCreatedEvent: (transactionId, data) => new OrderCreatedEvent(transactionId, data),
    OrderDeletedEvent: data => new OrderDeletedEvent(data),
    OrderUpdatedEvent: (transactionId, data) => new OrderUpdatedEvent(transactionId, data),
    OrderWelcomedEvent: data => new OrderWelcomedEvent(data)
  };
}
