import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TokenCreatedEvent, TokenCreatedFailEvent } from "../impl/token-created.event";
import { Logger, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";
import { TokenTypeDto } from "tokens/dtos/token-types.dto";

@EventsHandler(TokenCreatedEvent)
export class TokenCreatedHandler implements IEventHandler<TokenCreatedEvent> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>,
    @InjectRepository(TokenTypeDto)
    private readonly repositoryTokenType: Repository<TokenTypeDto>
  ) { }

  async handle(event: TokenCreatedEvent) {
    try {
      Logger.log(event, "TokenCreatedEvent");
      const token = JSON.parse(JSON.stringify(event.tokenDto));
      const transactionId = event.transactionId;
      let tokenTypeDto = null;
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
      return await this.repository.save(token);
    } catch (error) {
      Logger.error(error.message);
    }
  }
}

@EventsHandler(TokenCreatedFailEvent)
export class TokenCreatedFailHandler
  implements IEventHandler<TokenCreatedFailEvent> {
  handle(event: TokenCreatedFailEvent) {
    Logger.log(event, "TokenCreatedFailEvent");
  }
}
