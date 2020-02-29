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
import { Repository, getMongoRepository } from "typeorm";
import { TokenTypeDto } from "./dtos/token-types.dto";
import { TokensService } from "./services/tokens.service";
import { JwtModule } from "@nestjs/jwt";
import { config } from "../../config";
import { CONSTANTS } from "common/constant";

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenDto, TokenTypeDto]),
    CqrsModule,
    EventStoreModule.forFeature(),
    JwtModule.register({
      secret: config.JWT.secret
    })
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
  exports: [TokensService, JwtModule]
})
export class TokensModule implements OnModuleInit {
  constructor(
    private readonly command$: CommandBus,
    private readonly query$: QueryBus,
    private readonly event$: EventBus,
    private readonly tokensSagas: TokensSagas,
    private readonly eventStore: EventStore
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

    const freeTokenType = await getMongoRepository(TokenTypeDto).find({
      name: CONSTANTS.TOKEN_TYPE.FREE
    });
    if (!freeTokenType[0]) {
      await getMongoRepository(TokenTypeDto).save(new TokenTypeDto(CONSTANTS.TOKEN_TYPE.FREE, 10, 0));
    }
  }

  eventHandlers = {
    TokenCreatedEvent: (data) => new TokenCreatedEvent(data),
    TokenDeletedEvent: data => new TokenDeletedEvent(data),
    TokenUpdatedEvent: data => new TokenUpdatedEvent(data),
    TokenWelcomedEvent: data => new TokenWelcomedEvent(data)
  };
}
