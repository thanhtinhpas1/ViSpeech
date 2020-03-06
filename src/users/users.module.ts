import { CommandBus, CqrsModule, EventBus, QueryBus } from "@nestjs/cqrs";
import { Module, OnModuleInit, forwardRef } from "@nestjs/common";
import { CommandHandlers } from "./commands/handlers";
import { CommandHandlers as TokenCommandHandlers } from "tokens/commands/handlers";
import { EventHandlers } from "./events/handlers";
import { UsersSagas } from "./sagas/users.sagas";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { UserRepository } from "./repository/user.repository";
import { EventStoreModule } from "../core/event-store/event-store.module";
import { EventStore } from "../core/event-store/event-store";
import {
  UserCreationStartedEvent,
  UserCreatedFailEvent,
  UserCreatedEvent,
} from "./events/impl/user-created.event";
import { UserDeletedEvent } from "./events/impl/user-deleted.event";
import { UserUpdatedEvent } from "./events/impl/user-updated.event";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserDto } from "./dtos/users.dto";
import { QueryHandlers } from "./queries/handler";
import { AuthModule } from "auth/auth.module";
import { TokenRepository } from "tokens/repository/token.repository";
import { UserWelcomedEvent } from "./events/impl/user-welcomed.event";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDto]),
    CqrsModule,
    EventStoreModule.forFeature(),
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersSagas,
    ...CommandHandlers,
    ...TokenCommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    /*** REPOSITORY */
    UserRepository,
    TokenRepository
  ],
  exports: [UsersService]
})
export class UsersModule implements OnModuleInit {
  constructor(
    private readonly command$: CommandBus,
    private readonly query$: QueryBus,
    private readonly event$: EventBus,
    private readonly usersSagas: UsersSagas,
    private readonly eventStore: EventStore
  ) {}

  onModuleInit() {
    /** ------------ */
    this.eventStore.setEventHandlers(this.eventHandlers);
    this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
    this.event$.publisher = this.eventStore;
    /** ------------ */
    this.event$.register(EventHandlers);
    this.command$.register(CommandHandlers);
    this.query$.register(QueryHandlers);
    this.event$.registerSagas([UsersSagas]);
  }

  eventHandlers = {
    UserCreationStartedEvent: (transactionId, data) =>
      new UserCreationStartedEvent(transactionId, data),
    UserCreatedEvent: (transactionId, data) =>
      new UserCreatedEvent(transactionId, data),
    UserCreatedFailEvent: (transactionId, error) =>
      new UserCreatedFailEvent(transactionId, error),

    UserDeletedEvent: (transactionId, data) =>
      new UserDeletedEvent(transactionId, data),
    UserUpdatedEvent: data => new UserUpdatedEvent(data),
    UserWelcomedEvent: data => new UserWelcomedEvent(data)
  };
}
