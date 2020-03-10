import { IEvent } from "@nestjs/cqrs";

export class UserDeletedEvent implements IEvent {
  constructor(
    public readonly updatedBy: string,
    public readonly roles: string[],
    public readonly userId: string) { }
}
