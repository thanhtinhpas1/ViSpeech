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
    const {tokenDto} = event;
    const transactionId = event.transactionId;
    let tokenTypeDto = null;
    try {
      if (tokenDto.tokenTypeId) {
        tokenTypeDto = await this.repositoryTokenType.find({
          _id: tokenDto.tokenTypeId
        });
      } else {
        tokenTypeDto = await this.repositoryTokenType.find({
          name: CONSTANTS.TOKEN_TYPE.FREE
        });
      }
      tokenDto.tokenTypeId = tokenTypeDto[0]._id;
      tokenDto.minutes = tokenTypeDto[0].minutes;
      tokenDto.transactionId = transactionId;
      delete tokenDto.tokenType;
      delete tokenDto.orderId;
      const newToken = await this.repository.save(tokenDto);
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
