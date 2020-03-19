import { EventsHandler, IEventHandler, EventBus } from "@nestjs/cqrs";
import { Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";
import { TokenTypeDto } from "tokens/dtos/token-types.dto";
import { OrderedTokenCreatedEvent, OrderedTokenCreatedSuccessEvent, OrderedTokenCreatedFailedEvent } from "../impl/ordered-token-created.event";
import { Utils } from "utils";

@EventsHandler(OrderedTokenCreatedEvent)
export class OrderedTokenCreatedHandler implements IEventHandler<OrderedTokenCreatedEvent> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>,
    @InjectRepository(TokenTypeDto)
    private readonly repositoryTokenType: Repository<TokenTypeDto>,
    private readonly eventBus: EventBus,
  ) {}

  async handle(event: OrderedTokenCreatedEvent) {
    Logger.log(event.tokenDto._id, "OrderedTokenCreatedEvent");
    const { streamId, tokenDto } = event;
    let token = JSON.parse(JSON.stringify(tokenDto));
    let tokenTypeDto = null;

    try {
      if (token.tokenTypeId) {
        tokenTypeDto = await this.repositoryTokenType.findOne({ _id: token.tokenTypeId });
        if (!tokenTypeDto) {
          throw new NotFoundException(`Token type with _id ${token.tokenTypeId} does not exist.`);
        }
      } else if (token.tokenType) {
        tokenTypeDto = await this.repositoryTokenType.findOne({ name: token.tokenType });
      }
      token.tokenTypeId = tokenTypeDto._id;
      token.minutes = tokenTypeDto.minutes;
      token = Utils.removePropertiesFromObject(token, ['tokenType', 'orderId']);
      await this.repository.insert(token);
      this.eventBus.publish(new OrderedTokenCreatedSuccessEvent(streamId, tokenDto));
    } catch (error) {
      this.eventBus.publish(new OrderedTokenCreatedFailedEvent(streamId, tokenDto, error));
    }
  }
}

@EventsHandler(OrderedTokenCreatedSuccessEvent)
export class OrderedTokenCreatedSuccessHandler
  implements IEventHandler<OrderedTokenCreatedSuccessEvent> {
  handle(event: OrderedTokenCreatedSuccessEvent) {
    Logger.log(event.tokenDto._id, "OrderedTokenCreatedSuccessEvent");
  }
}

@EventsHandler(OrderedTokenCreatedFailedEvent)
export class OrderedTokenCreatedFailedHandler
  implements IEventHandler<OrderedTokenCreatedFailedEvent> {
  handle(event: OrderedTokenCreatedFailedEvent) {
    Logger.log(event.error, "OrderedTokenCreatedFailedEvent");
  }
}
