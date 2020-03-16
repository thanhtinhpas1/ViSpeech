import { IEvent } from "@nestjs/cqrs";

export class TokenDeletedEvent implements IEvent {
  constructor(
    public readonly streamId: string,
    public readonly tokenId: string
  ) {}
}
