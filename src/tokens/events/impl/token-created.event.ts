import { IEvent } from "@nestjs/cqrs";
import { TokenDto } from "tokens/dtos/tokens.dto";

export class TokenCreatedEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly tokenDto: TokenDto
  ) { }
}

export class TokenCreatedSuccessEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly tokenDto: TokenDto
  ) {}
}

export class TokenCreatedFailEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly tokenDto: TokenDto,
    public readonly error: object
  ) { }
}
