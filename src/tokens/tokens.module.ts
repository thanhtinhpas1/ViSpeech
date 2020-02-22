import { CommandBus, CqrsModule, EventBus, QueryBus } from "@nestjs/cqrs";
import { Module, OnModuleInit } from "@nestjs/common";
import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";
import { TokensSagas } from "./sagas/tokens.sagas";
import { TokensController } from "./controllers/tokens.controller";
import { TokenRepository } from "./repository/token.repository";
import { EventStoreModule } from "../core/event-store/event-store.module";
import { EventStore } from "../core/event-store/event-store";
import { TokenCreatedEvent } from "./events/impl/token-created.event";
import { TokenDeletedEvent } from "./events/impl/token-deleted.event";
import { TokenUpdatedEvent } from "./events/impl/token-updated.event";
import { TokenWelcomedEvent } from "./events/impl/token-welcomed.event";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { TokenDto } from "./dtos/tokens.dto";
import { QueryHandlers } from "./queries/handler";
import { Repository } from "typeorm";
import { TokenTypeDto } from "./dtos/token-types.dto";
import { TokensService } from "./services/tokens.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenDto, TokenTypeDto]),
    CqrsModule,
    EventStoreModule.forFeature()
  ],
  controllers: [TokensController],
  providers: [
    TokensSagas,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    TokenRepository,
    TokensService
  ],
  exports: [TokensService]
})
export class TokensModule implements OnModuleInit {
  constructor(
    private readonly command$: CommandBus,
    private readonly query$: QueryBus,
    private readonly event$: EventBus,
    private readonly tokensSagas: TokensSagas,
    private readonly eventStore: EventStore,
    @InjectRepository(TokenTypeDto)
    private readonly repository: Repository<TokenTypeDto>
  ) {}

  async onModuleInit() {
    this.eventStore.setEventHandlers(this.eventHandlers);
    await this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
    this.event$.publisher = this.eventStore;
    /** ------------ */
    this.event$.register(EventHandlers);
    this.command$.register(CommandHandlers);
    this.query$.register(QueryHandlers);
    this.event$.registerSagas([TokensSagas]);

    const freeTokenType = await this.repository.find({ name: "free" });
    if (!freeTokenType[0]) {
      const freeTokenType = new TokenTypeDto("free", 10, 0);
      await this.repository.save(freeTokenType);
    }
  }

  eventHandlers = {
    TokenCreatedEvent: (data, userDto) => new TokenCreatedEvent(data, userDto),
    TokenDeletedEvent: data => new TokenDeletedEvent(data),
    TokenUpdatedEvent: data => new TokenUpdatedEvent(data),
    TokenWelcomedEvent: data => new TokenWelcomedEvent(data)
  };
}
