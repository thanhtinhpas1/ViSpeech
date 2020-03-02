import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TokenDeletedEvent } from "../impl/token-deleted.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";

@EventsHandler(TokenDeletedEvent)
export class TokenDeletedHandler implements IEventHandler<TokenDeletedEvent> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>
  ) {}

  async handle(event: TokenDeletedEvent) {
    try {
      Logger.log(event, "TokenDeletedEvent");
      const tokenId = event.tokenId;
      return await this.repository.delete({ _id: tokenId });
    } catch (error) {
      Logger.error(error, "", "TokenDeletedEvent");
    }
  }
}
