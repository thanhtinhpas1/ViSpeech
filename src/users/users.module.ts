import { forwardRef, Module, OnModuleInit } from "@nestjs/common";
import { CommandBus, EventBus, EventPublisher, QueryBus } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "auth/auth.module";
import { EventStoreModule } from "core/event-store/event-store.module";
import { CommandHandlers as TokenCommandHandlers } from "tokens/commands/handlers";
import { TokenRepository } from "tokens/repository/token.repository";
import { EventStore } from "../core/event-store/event-store";
import { CommandHandlers } from "./commands/handlers";
import { UsersController } from "./controllers/users.controller";
import { UserDto } from "./dtos/users.dto";
import { EventHandlers } from "./events/handlers";
import { AssignedRoleEvent } from "./events/impl/role-assigned.event";
import {
  UserCreationStartedEvent,
  UserCreatedFailEvent,
  UserCreatedEvent,
  UserCreatedSuccessEvent,
} from "./events/impl/user-created.event";
import { UserDeletedEvent } from "./events/impl/user-deleted.event";
import { UserUpdatedEvent } from "./events/impl/user-updated.event";
import { UserWelcomedEvent } from "./events/impl/user-welcomed.event";
import { QueryHandlers } from "./queries/handler";
import { UserRepository } from "./repository/user.repository";
import { UsersSagas } from "./sagas/users.sagas";
import { UsersService } from "./services/users.service";
import { TokensModule } from "tokens/tokens.module"

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDto]),
    forwardRef(() => AuthModule),
    EventStoreModule.forFeature(),
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
    TokenRepository,
    QueryBus, EventBus, EventStore, CommandBus, EventPublisher,
  ],
  exports: [UsersService]
})
export class UsersModule implements OnModuleInit {

  constructor(
    private readonly command$: CommandBus,
    private readonly query$: QueryBus,
    private readonly event$: EventBus,
    private readonly eventStore: EventStore
  ) { }

  async onModuleInit() {
    /** ------------ */
    this.eventStore.setEventHandlers({...this.eventHandlers, ...TokensModule.eventHandlers});
    this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
    this.event$.publisher = this.eventStore;
    /** ------------ */
    this.event$.register(EventHandlers);
    this.command$.register([...CommandHandlers, ...TokenCommandHandlers]);
    this.query$.register(QueryHandlers);
    this.event$.registerSagas([UsersSagas]);
  }

  eventHandlers = {
    UserCreationStartedEvent: (transactionId, data) =>
      new UserCreationStartedEvent(transactionId, data),
    UserCreatedEvent: (transactionId, data) =>
      new UserCreatedEvent(transactionId, data),
    UserCreatedSuccessEvent: (transactionId, data) =>
      new UserCreatedSuccessEvent(transactionId, data),
    UserCreatedFailEvent: (transactionId, data, error) =>
      new UserCreatedFailEvent(transactionId, data, error),

    UserDeletedEvent: (transactionId, data) =>
      new UserDeletedEvent(transactionId, data),
    UserUpdatedEvent: (transactionId, data) => new UserUpdatedEvent(transactionId, data),
    UserWelcomedEvent: data => new UserWelcomedEvent(data),
    AssignedRoleEvent: (transactionId, roles) => new AssignedRoleEvent(transactionId, roles),
  };
}
