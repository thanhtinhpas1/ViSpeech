import { forwardRef, Module, OnModuleInit } from "@nestjs/common";
import { CommandBus, EventBus, EventPublisher, QueryBus } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "auth/auth.module";
import { EventStoreModule } from "core/event-store/event-store.module";
import { CommandHandlers as TokenCommandHandlers } from "tokens/commands/handlers";
import { TokenRepository } from "tokens/repository/token.repository";
import { TokensModule } from "tokens/tokens.module";
import { EventStore } from "../core/event-store/event-store";
import { CommandHandlers } from "./commands/handlers";
import { UsersController } from "./controllers/users.controller";
import { UserDto } from "./dtos/users.dto";
import { EventHandlers } from "./events/handlers";
import { UserRoleAssignedEvent, UserRoleAssignedSuccessEvent, UserRoleAssignedFailedEvent } from "./events/impl/user-role-assigned.event";
import {
  UserCreatedEvent,
  UserCreatedFailedEvent,
  UserCreatedSuccessEvent,
  UserCreationStartedEvent
} from "./events/impl/user-created.event";
import {
  UserDeletedEvent,
  UserDeletedSuccessEvent,
  UserDeletedFailedEvent
} from "./events/impl/user-deleted.event";
import {
  UserUpdatedEvent,
  UserUpdatedSuccessEvent,
  UserUpdatedFailedEvent
} from "./events/impl/user-updated.event";
import { UserWelcomedEvent } from "./events/impl/user-welcomed.event";
import { QueryHandlers } from "./queries/handler";
import { UserRepository } from "./repository/user.repository";
import { UsersSagas } from "./sagas/users.sagas";
import { UsersService } from "./services/users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDto]),
    forwardRef(() => AuthModule),
    EventStoreModule.forFeature()
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
    QueryBus,
    EventBus,
    EventStore,
    CommandBus,
    EventPublisher
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
    this.eventStore.setEventHandlers({
      ...this.eventHandlers,
      ...TokensModule.eventHandlers
    });
    this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
    this.event$.publisher = this.eventStore;
    /** ------------ */
    this.event$.register(EventHandlers);
    this.command$.register([...CommandHandlers, ...TokenCommandHandlers]);
    this.query$.register(QueryHandlers);
    this.event$.registerSagas([UsersSagas]);
  }

  eventHandlers = {
    // create
    UserCreationStartedEvent: data => new UserCreationStartedEvent(data),
    UserCreatedEvent: data => new UserCreatedEvent(data),
    UserCreatedSuccessEvent: data => new UserCreatedSuccessEvent(data),
    UserCreatedFailedEvent: (data, error) => new UserCreatedFailedEvent(data, error),

    // update
    UserUpdatedEvent: data => new UserUpdatedEvent(data),
    UserUpdatedSuccessEvent: data => new UserUpdatedSuccessEvent(data),
    UserUpdatedFailedEvent: (data, error) => new UserUpdatedFailedEvent(data, error),

    // delete
    UserDeletedEvent: data => new UserDeletedEvent(data),
    UserDeletedSuccessEvent: data => new UserDeletedSuccessEvent(data),
    UserDeletedFailedEvent: (data, error) => new UserDeletedFailedEvent(data, error),

    // assign user role
    UserRoleAssignedEvent: (userId, roleNames, assignerId) => new UserRoleAssignedEvent(userId, roleNames, assignerId),
    UserRoleAssignedSuccessEvent: (userId, roleNames, assignerId) => new UserRoleAssignedSuccessEvent(userId, roleNames, assignerId),
    UserRoleAssignedFailedEvent: (userId, roleNames, assignerId, error) => new UserRoleAssignedFailedEvent(userId, roleNames, assignerId, error),
  
    UserWelcomedEvent: data => new UserWelcomedEvent(data),
  };
}
