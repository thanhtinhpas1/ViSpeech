import { ICommand } from "@nestjs/cqrs";
import { TokenIdRequestParamsDto } from "../../dtos/tokens.dto";

export class DeleteTokenCommand implements ICommand {
  constructor(
    public readonly transactionId: string,
    public readonly tokenIdDto: TokenIdRequestParamsDto
  ) {}
}
