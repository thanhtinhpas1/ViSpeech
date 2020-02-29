import { IEvent } from "@nestjs/cqrs";
import { TokenDto } from "tokens/dtos/tokens.dto";

export class TokenCreatedEvent implements IEvent {
  constructor(
    public readonly tokenDto: TokenDto
  ) {}
}
