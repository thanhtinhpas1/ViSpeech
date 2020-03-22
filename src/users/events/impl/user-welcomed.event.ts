import { IEvent } from "@nestjs/cqrs";

export class UserWelcomedEvent implements IEvent {
  constructor(
    public readonly streamId: string,
    public readonly userId: string
  ) { }
}
