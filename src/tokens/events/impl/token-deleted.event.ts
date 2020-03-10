import { IEvent } from "@nestjs/cqrs";

export class TokenDeletedEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly tokenId: string
  ) {}
}
