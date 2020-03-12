import { IEvent } from "@nestjs/cqrs";
import { TokenDto } from "tokens/dtos/tokens.dto";

export class OrderedTokenCreatedEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly tokenDto: TokenDto
  ) {}
}

export class OrderedTokenCreatedSuccessEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly tokenDto: TokenDto
  ) {}
}

export class OrderedTokenCreatedFailEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly tokenDto: TokenDto,
    public readonly error: object
  ) {}
}
