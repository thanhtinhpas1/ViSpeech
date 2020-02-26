import { CommandBus, CqrsModule, EventBus, QueryBus } from "@nestjs/cqrs";
import { Module, OnModuleInit, forwardRef } from "@nestjs/common";
import { CommandHandlers } from "./commands/handlers";
import { CommandHandlers as TokenCommandHandlers } from "tokens/commands/handlers"
import { EventHandlers } from "./events/handlers";
import { UsersSagas } from "./sagas/users.sagas";
import { TokensSagas } from "tokens/sagas/tokens.sagas";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { UserRepository } from "./repository/user.repository";
import { EventStoreModule } from "../core/event-store/event-store.module";
import { EventStore } from "../core/event-store/event-store";
import { UserCreatedEvent } from "./events/impl/user-created.event";
import { UserDeletedEvent } from "./events/impl/user-deleted.event";
import { UserUpdatedEvent } from "./events/impl/user-updated.event";
import { UserCreationStartedEvent } from "./events/impl/user-created.event";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserDto } from "./dtos/users.dto";
import { QueryHandlers } from "./queries/handler";
import { TokenTypeDto } from "../tokens/dtos/token-types.dto";
import { RoleDto } from "../roles/dtos/roles.dto";
import { TokensModule } from "tokens/tokens.module";
import { AuthModule } from "auth/auth.module";
import { RolesModule } from "roles/roles.module";
import { TokenRepository } from "tokens/repository/token.repository";
import { UserWelcomedEvent } from "./events/impl/user-welcomed.event";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDto, TokenTypeDto, RoleDto]),
    CqrsModule,
    EventStoreModule.forFeature(),
    TokensModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersSagas,
    TokensSagas,
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
    UserCreatedEvent: data => new UserCreatedEvent(data),
    UserDeletedEvent: data => new UserDeletedEvent(data),
    UserUpdatedEvent: data => new UserUpdatedEvent(data),
    UserCreationStartedEvent: data => new UserCreationStartedEvent(data),
    UserWelcomedEvent: data => new UserWelcomedEvent(data)
  };
}
