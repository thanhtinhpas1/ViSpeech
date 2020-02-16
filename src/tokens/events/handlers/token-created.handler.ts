import { IEventHandler, EventsHandler } from "@nestjs/cqrs";
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
  ) {}

  async handle(event: TokenCreatedEvent) {
    Logger.log(event, "TokenCreatedEvent");
    const token = event.tokenDto[0];
    const freeTokenType = await this.repositoryTokenType.find({ name: "free" });
    console.log("freeTokenType", freeTokenType)
    token.tokenType = freeTokenType[0];
    this.repository.save(token);
  }
}
