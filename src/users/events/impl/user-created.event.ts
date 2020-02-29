import { IEvent } from "@nestjs/cqrs";
import { UserDto } from "../../dtos/users.dto";
import { TokenDto } from "tokens/dtos/tokens.dto";

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

export class UserTokenCreatedEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly tokenDto: TokenDto
  ) {}
}

export class UserTokenCreatedFailEvent implements IEvent {
  constructor(
    public readonly transactionId: string,
    public readonly error: object
  ) {}
}
