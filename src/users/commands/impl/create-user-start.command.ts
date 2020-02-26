import { ICommand } from "@nestjs/cqrs";
import { UserDto } from "../../dtos/users.dto";

export class CreateUserStartCommand implements ICommand {
  constructor(public readonly userDto: UserDto) {}
}
