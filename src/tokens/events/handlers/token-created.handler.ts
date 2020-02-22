import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TokenCreatedEvent } from "../impl/token-created.event";
import { Logger } from "@nestjs/common";
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
    ) {
    }

  async handle(event: TokenCreatedEvent) {
    try {
      Logger.log(event, "TokenCreatedEvent");
      const token = event.tokenDto[0];
      const freeTokenType = await this.repositoryTokenType.find({
        name: "free"
      });
      token.tokenTypeId = freeTokenType[0].id;
      token.minutes = freeTokenType[0].minutes;
      this.repository.save(token);
      return event.tokenDto[1]; // userDto
    } catch (error) {
      Logger.error(error, "TokenCreatedHandler");
    }
  }
}
