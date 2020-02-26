import { IEvent } from "@nestjs/cqrs";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { UserDto } from "users/dtos/users.dto";

export class TokenCreatedEvent implements IEvent {
  constructor(
    public readonly tokenDto: TokenDto,
    public readonly userDto: UserDto
  ) {}
}
