import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TokenCreatedEvent } from "../impl/token-created.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";
import { TokenTypeDto } from "tokens/dtos/token-types.dto";
import { CONSTANTS } from "common/constant";

@EventsHandler(TokenCreatedEvent)
export class TokenCreatedHandler implements IEventHandler<TokenCreatedEvent> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>,
    @InjectRepository(TokenTypeDto)
    private readonly repositoryTokenType: Repository<TokenTypeDto>
  ) {}

  async handle(event: TokenCreatedEvent) {
    try {
      Logger.log(event, "TokenCreatedEvent");
      const token = event.tokenDto[0];
      Logger.log(token, "TokenCreatedEvent");
      const freeTokenType = await this.repositoryTokenType.find({
        name: token.tokenType || CONSTANTS.TOKEN_TYPE.FREE
      });
      token.tokenTypeId = freeTokenType[0].id;
      token.minutes = freeTokenType[0].minutes;
      delete token.tokenType;
      const savedToken = await this.repository.save(token);
      if (event.tokenDto[1]) { // userDto
        return event.tokenDto[1];
      }
      return savedToken;
    } catch (error) {
      Logger.error(error, "TokenCreatedEvent");
    }
  }
}
