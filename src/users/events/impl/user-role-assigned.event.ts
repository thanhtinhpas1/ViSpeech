import { IEvent } from "@nestjs/cqrs";

export class UserRoleAssignedEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly userId: string,
    public readonly roleNames: string[],
    public readonly assignerId: string
  ) {}
}
