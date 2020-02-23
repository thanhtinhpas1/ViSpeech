import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TokenUpdatedEvent } from "../impl/token-updated.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";
import { TokenTypeDto } from "tokens/dtos/token-types.dto";
import { CONSTANTS } from "common/constant";

@EventsHandler(TokenUpdatedEvent)
export class TokenUpdatedHandler implements IEventHandler<TokenUpdatedEvent> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>,
    @InjectRepository(TokenTypeDto)
    private readonly repositoryTokenType: Repository<TokenTypeDto>
  ) {}

  async handle(event: TokenUpdatedEvent) {
    try {
      Logger.log(event, "TokenUpdatedEvent"); // write here
      const { id, ...tokenInfo } = event.tokenDto[0];
      const freeTokenType = await this.repositoryTokenType.find({
        name: tokenInfo.tokenType || CONSTANTS.TOKEN_TYPE.FREE
      });
      tokenInfo.tokenTypeId = freeTokenType[0].id;
      tokenInfo.minutes = freeTokenType[0].minutes;
      return await this.repository.update(id, tokenInfo);
    } catch (error) {
      Logger.error(error, "TokenUpdatedEvent");
    }
  }
}
