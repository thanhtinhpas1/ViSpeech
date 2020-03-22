import { IEvent } from "@nestjs/cqrs";
import { TokenDto } from "tokens/dtos/tokens.dto";

export class OrderedTokenCreatedEvent implements IEvent {
  constructor(
    public readonly streamId: string,
    public readonly tokenDto: TokenDto
  ) {}
}

export class OrderedTokenCreatedSuccessEvent implements IEvent {
  constructor(
    public readonly streamId: string,
    public readonly tokenDto: any
  ) {}
}

export class OrderedTokenCreatedFailedEvent implements IEvent {
  constructor(
    public readonly streamId: string,
    public readonly tokenDto: TokenDto,
    public readonly error: object
  ) {}
}
