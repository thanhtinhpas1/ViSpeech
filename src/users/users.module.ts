import { CommandBus, EventBus, CqrsModule, QueryBus } from "@nestjs/cqrs";
import { OnModuleInit, Module, forwardRef } from "@nestjs/common";
import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";
import { UsersSagas } from "./sagas/users.sagas";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { UserRepository } from "./repository/user.repository";
import { EventStoreModule } from "../core/event-store/event-store.module";
import { EventStore } from "../core/event-store/event-store";
import { UserCreatedEvent } from "./events/impl/user-created.event";
import { UserDeletedEvent } from "./events/impl/user-deleted.event";
import { UserUpdatedEvent } from "./events/impl/user-updated.event";
import { UserWelcomedEvent } from "./events/impl/user-welcomed.event";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserDto } from "./dtos/users.dto";
import { QueryHandlers } from "./queries/handler";
import { AuthModule } from "auth/auth.module";
import { TokensService } from "tokens/services/tokens.service";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { RoleDto } from "roles/dtos/roles.dto";
import { TokenTypesService } from "tokens/services/token-types.service";
import { TokenTypeDto } from "tokens/dtos/token-types.dto";
import { RolesService } from "roles/services/roles.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDto, TokenDto, RoleDto, TokenTypeDto]),
    CqrsModule,
    EventStoreModule.forFeature(),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    TokensService,
    TokenTypesService,
    RolesService,
    UsersSagas,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,

    /*** REPOSITORY */
    UserRepository,
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
  ) { }

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
    UserWelcomedEvent: data => new UserWelcomedEvent(data)
  };
}
