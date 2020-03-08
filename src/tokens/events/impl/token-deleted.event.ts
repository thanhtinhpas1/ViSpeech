import { IEvent } from "@nestjs/cqrs";

export class TokenDeletedEvent implements IEvent {
  constructor(
    public readonly tokenId: string) { }
}
