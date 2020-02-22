import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TokenUpdatedEvent } from "../impl/token-updated.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";

@EventsHandler(TokenUpdatedEvent)
export class TokenUpdatedHandler implements IEventHandler<TokenUpdatedEvent> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>
  ) {}

  handle(event: TokenUpdatedEvent) {
    Logger.log(event, "TokenUpdatedEvent"); // write here
    const { id, ...tokenInfo } = event.tokenDto[0];
    this.repository.update(id, tokenInfo);
  }
}
