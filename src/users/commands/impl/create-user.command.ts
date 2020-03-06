import { ICommand } from "@nestjs/cqrs";
import { UserDto } from "../../dtos/users.dto";

export class CreateUserStartCommand implements ICommand {
  constructor(
    public readonly transactionId: string,
    public readonly userDto: UserDto
  ) {}
}

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly transactionId: string,
    public readonly userDto: UserDto
  ) {}
}
