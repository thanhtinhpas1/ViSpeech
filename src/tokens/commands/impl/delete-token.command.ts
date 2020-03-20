import { ICommand } from "@nestjs/cqrs";
import { TokenIdRequestParamsDto } from "../../dtos/tokens.dto";

export class DeleteTokenCommand implements ICommand {
  constructor(
    public readonly streamId: string,
    public readonly tokenIdDto: TokenIdRequestParamsDto
  ) {}
}

export class DeleteTokenByUserIdCommand implements ICommand {
  constructor(
    public readonly streamId: string,
    public readonly userId: string
  ) {}
}
