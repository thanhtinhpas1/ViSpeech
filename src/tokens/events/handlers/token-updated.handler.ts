import { Logger, NotFoundException } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenTypeDto } from "tokens/dtos/token-types.dto";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";
import { TokenUpdatedEvent } from "../impl/token-updated.event";

@EventsHandler(TokenUpdatedEvent)
export class TokenUpdatedHandler implements IEventHandler<TokenUpdatedEvent> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>,
    @InjectRepository(TokenTypeDto)
    private readonly repositoryTokenType: Repository<TokenTypeDto>
  ) { }

  async handle(event: TokenUpdatedEvent) {
    Logger.log(event.tokenDto._id, "TokenUpdatedEvent"); // write here
    const { _id, ...tokenInfo } = event.tokenDto;
    let tokenTypeDto = null;
    try {
      if (tokenInfo.tokenTypeId) {
        tokenTypeDto = await this.repositoryTokenType.findOne({ _id: tokenInfo.tokenTypeId });
        if (!tokenTypeDto) {
          throw new NotFoundException(`Token type with _id ${tokenInfo.tokenTypeId} does not exist.`);
        }
      } else if (tokenInfo.tokenType) {
        tokenTypeDto = await this.repositoryTokenType.findOne({ name: tokenInfo.tokenType });
      }
      tokenInfo.minutes = tokenTypeDto.minutes;
      return await this.repository.update({ _id }, tokenInfo);
    } catch (error) {
      Logger.error(error, "", "TokenUpdatedEvent");
    }
  }
}
