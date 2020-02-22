import { ICommand } from "@nestjs/cqrs";
import { TokenDto } from "../../dtos/tokens.dto";
import { UserDto } from "users/dtos/users.dto";

export class CreateTokenCommand implements ICommand {
  constructor(
    public readonly tokenDto: TokenDto,
    public readonly userDto: UserDto
  ) {}
}
