import { EventsHandler, IEventHandler, EventBus } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";
import { TokenTypeDto } from "tokens/dtos/token-types.dto";
import { FreeTokenCreatedEvent, FreeTokenCreatedSuccessEvent, FreeTokenCreatedFailedEvent } from "../impl/free-token-created.event";
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
    Logger.log(event.tokenDto._id, "FreeTokenCreatedEvent");
    const { tokenDto } = event;
    const token = JSON.parse(JSON.stringify(tokenDto)); // deep clone
    try {
      const tokenTypeDto = await this.repositoryTokenType.findOne({ name: CONSTANTS.TOKEN_TYPE.FREE });
      token.tokenTypeId = tokenTypeDto._id;
      token.minutes = tokenTypeDto.minutes;
      delete token.tokenType;
      delete token.orderId;
      const newToken = await this.repository.insert(token);
      this.eventBus.publish(new FreeTokenCreatedSuccessEvent(newToken));
    } catch (error) {
      this.eventBus.publish(new FreeTokenCreatedFailedEvent(tokenDto, error));
    }
  }
}

@EventsHandler(FreeTokenCreatedSuccessEvent)
export class FreeTokenCreatedSuccessHandler
  implements IEventHandler<FreeTokenCreatedSuccessEvent> {
  handle(event: FreeTokenCreatedSuccessEvent) {
    Logger.log(event.tokenDto._id, "FreeTokenCreatedSuccessEvent");
  }
}

@EventsHandler(FreeTokenCreatedFailedEvent)
export class FreeTokenCreatedFailedHandler
  implements IEventHandler<FreeTokenCreatedFailedEvent> {
  handle(event: FreeTokenCreatedFailedEvent) {
    Logger.log(event.error, "FreeTokenCreatedFailedEvent");
  }
}
