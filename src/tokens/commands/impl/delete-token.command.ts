import { ICommand } from "@nestjs/cqrs";
import { TokenIdRequestParamsDto } from "../../dtos/tokens.dto";

export class DeleteTokenCommand implements ICommand {
  constructor(
    public readonly tokenIdDto: TokenIdRequestParamsDto
  ) {}
}
