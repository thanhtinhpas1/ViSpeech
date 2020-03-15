import { IEvent } from "@nestjs/cqrs";

export class UserDeletedEvent implements IEvent {
  constructor(
    public readonly userId: string
  ) { }
}

export class UserDeletedSuccessEvent implements IEvent {
  constructor(
    public readonly userId: string
  ) { }
}

export class UserDeletedFailedEvent implements IEvent {
  constructor(
    public readonly userId: string,
    public readonly error: object
  ) { }
}
