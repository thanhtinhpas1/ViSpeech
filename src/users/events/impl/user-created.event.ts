import { IEvent } from "@nestjs/cqrs";
import { UserDto } from "../../dtos/users.dto";

export class UserCreationStartedEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly userDto: UserDto
  ) {}
}

export class UserCreatedEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly userDto: UserDto
  ) {}
}

export class UserCreatedFailEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly error: object
  ) {}
}
