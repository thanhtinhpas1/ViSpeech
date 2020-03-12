import { EventsHandler, IEventHandler, EventBus } from "@nestjs/cqrs";
import { TokenCreatedEvent, TokenCreatedFailEvent, TokenCreatedSuccessEvent } from "../impl/token-created.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenTypeDto } from "tokens/dtos/token-types.dto";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";

@EventsHandler(TokenCreatedEvent)
export class TokenCreatedHandler implements IEventHandler<TokenCreatedEvent> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>,
    @InjectRepository(TokenTypeDto)
    private readonly repositoryTokenType: Repository<TokenTypeDto>,
    private readonly eventBus: EventBus
  ) {}

  async handle(event: TokenCreatedEvent) {
    Logger.log(event, "TokenCreatedEvent");
    const token = JSON.parse(JSON.stringify(event.tokenDto));
    const transactionId = event.transactionId;
    let tokenTypeDto = null;
    try {
      if (token.tokenTypeId) {
        tokenTypeDto = await this.repositoryTokenType.find({
          _id: token.tokenTypeId
        });
      } else {
        tokenTypeDto = await this.repositoryTokenType.find({
          name: token.tokenType
        });
      }
      token.tokenTypeId = tokenTypeDto[0]._id;
      token.minutes = tokenTypeDto[0].minutes;
      token.transactionId = transactionId;
      delete token.tokenType;
      delete token.orderId;
      const newToken = await this.repository.save(token);
      this.eventBus.publish(new TokenCreatedSuccessEvent(transactionId, newToken));
    } catch (error) {
      this.eventBus.publish(new TokenCreatedFailEvent(transactionId, token, error));
    }
  }
}

@EventsHandler(TokenCreatedSuccessEvent)
export class TokenCreatedSuccessHandler
  implements IEventHandler<TokenCreatedSuccessEvent> {
  handle(event: TokenCreatedSuccessEvent) {
    Logger.log(event, "TokenCreatedSuccessEvent");
  }
}

@EventsHandler(TokenCreatedFailEvent)
export class TokenCreatedFailHandler
  implements IEventHandler<TokenCreatedFailEvent> {
  handle(event: TokenCreatedFailEvent) {
    Logger.log(event.transactionId, "TokenCreatedFailEvent");
  }
}
