import { IEvent } from "@nestjs/cqrs";

export class UserDeletedEvent implements IEvent {
  constructor(public readonly transactionId: string, public readonly userId: string) {}
}
