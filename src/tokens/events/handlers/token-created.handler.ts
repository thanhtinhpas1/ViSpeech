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
      const token = event.tokenDto;
      const tokenTypeDto = await this.repositoryTokenType.find({
        name: token.tokenType
      });
      token.tokenTypeId = tokenTypeDto[0]._id.toString();
      token.minutes = tokenTypeDto[0].minutes;
      delete token.tokenType;
      return await this.repository.save(token);
    } catch (error) {
      Logger.error(error, "", "TokenCreatedEvent");
    }
  }
}
