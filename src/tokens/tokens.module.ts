import { CommandBus, EventBus, CqrsModule } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { TokensSagas } from './sagas/tokens.sagas';
import { TokensController } from './controllers/tokens.controller';
import { TokensService } from './services/tokens.service';
import { TokenRepository } from './repository/token.repository';
import { EventStoreModule } from '../core/event-store/event-store.module';
import { EventStore } from '../core/event-store/event-store';
import { TokenCreatedEvent } from './events/impl/token-created.event';
import { TokenDeletedEvent } from './events/impl/token-deleted.event';
import { TokenUpdatedEvent } from './events/impl/token-updated.event';
import { TokenWelcomedEvent } from './events/impl/token-welcomed.event';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenDto } from './dtos/tokens.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenDto]),
    CqrsModule,
    EventStoreModule.forFeature(),
  ],
  controllers: [TokensController],
  providers: [
    TokensService,
    TokensSagas,
    ...CommandHandlers,
    ...EventHandlers,
    TokenRepository,
  ],
})
export class TokensModule implements OnModuleInit {
  constructor(
    // private readonly moduleRef: ModuleRef,
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
    private readonly tokensSagas: TokensSagas,
    private readonly eventStore: EventStore,
  ) {}

  onModuleInit() {
    // this.command$.setModuleRef(this.moduleRef);
    // this.event$.setModuleRef(this.moduleRef);
    /** ------------ */
    this.eventStore.setEventHandlers(this.eventHandlers);
    this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
    this.event$.publisher = this.eventStore;
    /** ------------ */
    this.event$.register(EventHandlers);
    this.command$.register(CommandHandlers);
    this.event$.registerSagas([TokensSagas]);
  }

  eventHandlers = {
    TokenCreatedEvent: (data) => new TokenCreatedEvent(data),
    TokenDeletedEvent: (data) => new TokenDeletedEvent(data),
    TokenUpdatedEvent: (data) => new TokenUpdatedEvent(data),
    TokenWelcomedEvent: (data) => new TokenWelcomedEvent(data)
  };
}
