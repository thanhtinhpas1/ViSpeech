import { IEvent } from "@nestjs/cqrs";
import { TokenDto } from "tokens/dtos/tokens.dto";

export class FreeTokenCreatedEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly tokenDto: TokenDto,
  ) {}
}

export class FreeTokenCreatedSuccessEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly tokenDto: TokenDto,
  ) {}
}

export class FreeTokenCreatedFailEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly error: object,
  ) {}
}
