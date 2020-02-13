import { IEventHandler, EventsHandler } from "@nestjs/cqrs";
import { TokenCreatedEvent } from "../impl/token-created.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";

@EventsHandler(TokenCreatedEvent)
export class TokenCreatedHandler implements IEventHandler<TokenCreatedEvent> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>
  ) {}

  handle(event: TokenCreatedEvent) {
    Logger.log(event, "TokenCreatedEvent");
    const token = event.tokenDto[0];
    this.repository.save(token);
  }
}
