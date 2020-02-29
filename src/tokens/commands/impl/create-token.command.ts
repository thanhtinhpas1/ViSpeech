import { ICommand } from "@nestjs/cqrs";
import { TokenDto } from "../../dtos/tokens.dto";

export class CreateTokenCommand implements ICommand {
  constructor(
    public readonly tokenDto: TokenDto
  ) {}
}

export class CreateUserTokenCommand implements ICommand {
  constructor(
    public readonly transactionId: string,
    public readonly tokenDto: TokenDto,
  ) {}
}
