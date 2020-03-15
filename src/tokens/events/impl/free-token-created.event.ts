import { IEvent } from "@nestjs/cqrs";
import { TokenDto } from "tokens/dtos/tokens.dto";

export class FreeTokenCreatedEvent implements IEvent {
  constructor(
    public readonly tokenDto: TokenDto
  ) {}
}

export class FreeTokenCreatedSuccessEvent implements IEvent {
  constructor(
    public readonly tokenDto: any
  ) {}
}

export class FreeTokenCreatedFailedEvent implements IEvent {
  constructor(
    public readonly tokenDto: TokenDto,
    public readonly error: object
  ) {}
}
