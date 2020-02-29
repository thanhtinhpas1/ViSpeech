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
      const { _id, ...tokenInfo } = event.tokenDto;
      const tokenTypeDto = await this.repositoryTokenType.find({
        name: tokenInfo.tokenType || CONSTANTS.TOKEN_TYPE.FREE
      });
      tokenInfo.tokenTypeId = tokenTypeDto[0]._id.toString();
      tokenInfo.minutes = tokenTypeDto[0].minutes;
      return await this.repository.update(_id, tokenInfo);
    } catch (error) {
      Logger.error(error, "", "TokenUpdatedEvent");
    }
  }
}
