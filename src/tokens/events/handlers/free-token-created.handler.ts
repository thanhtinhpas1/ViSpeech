import { EventsHandler, IEventHandler, EventBus } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";
import { TokenTypeDto } from "tokens/dtos/token-types.dto";
import { FreeTokenCreatedEvent, FreeTokenCreatedSuccessEvent, FreeTokenCreatedFailEvent } from "../impl/free-token-created.event";
import { CONSTANTS } from "common/constant";

@EventsHandler(FreeTokenCreatedEvent)
export class FreeTokenCreatedHandler implements IEventHandler<FreeTokenCreatedEvent> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>,
    @InjectRepository(TokenTypeDto)
    private readonly repositoryTokenType: Repository<TokenTypeDto>,
    private readonly eventBus: EventBus
  ) {}

  async handle(event: FreeTokenCreatedEvent) {
    Logger.log(event, "FreeTokenCreatedEvent");
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
          name: CONSTANTS.TOKEN_TYPE.FREE
        });
      }
      token.tokenTypeId = tokenTypeDto[0]._id;
      token.minutes = tokenTypeDto[0].minutes;
      token.transactionId = transactionId;
      delete token.tokenType;
      delete token.orderId;
      const newToken = await this.repository.save(token);
      this.eventBus.publish(new FreeTokenCreatedSuccessEvent(transactionId, newToken));
    } catch (error) {
      this.eventBus.publish(new FreeTokenCreatedFailEvent(transactionId, error));
    }
  }
}

@EventsHandler(FreeTokenCreatedSuccessEvent)
export class FreeTokenCreatedSuccessHandler
  implements IEventHandler<FreeTokenCreatedSuccessEvent> {
  handle(event: FreeTokenCreatedSuccessEvent) {
    Logger.log(event, "FreeTokenCreatedSuccessEvent");
  }
}

@EventsHandler(FreeTokenCreatedFailEvent)
export class FreeTokenCreatedFailHandler
  implements IEventHandler<FreeTokenCreatedFailEvent> {
  handle(event: FreeTokenCreatedFailEvent) {
    Logger.log(event, "FreeTokenCreatedFailEvent");
  }
}
