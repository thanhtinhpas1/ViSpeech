import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";
import { TokenDeletedEvent } from "../impl/token-deleted.event";

@EventsHandler(TokenDeletedEvent)
export class TokenDeletedHandler implements IEventHandler<TokenDeletedEvent> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>
  ) {}

  async handle(event: TokenDeletedEvent) {
    try {
      Logger.log(event.tokenId, "TokenDeletedEvent");
      const tokenId = event.tokenId;
      return await this.repository.delete({ _id: tokenId });
    } catch (error) {
      Logger.error(error, "", "TokenDeletedEvent");
    }
  }
}
