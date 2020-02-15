import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { TokenIdRequestParamsDto } from "../dtos/tokens.dto";
import { TokenDto } from "../dtos/tokens.dto";
import { CreateTokenCommand } from "../commands/impl/create-token.command";
import { UpdateTokenCommand } from "../commands/impl/update-token.command";
import { DeleteTokenCommand } from "../commands/impl/delete-token.command";
import { GetTokensQuery } from "tokens/queries/impl/get-tokens.query";
import { FindTokenQuery } from "tokens/queries/impl/find-token.query";

@Injectable()
export class TokensService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async createToken(tokenDto: TokenDto) {
    return await this.commandBus.execute(new CreateTokenCommand(tokenDto));
  }

  async updateToken(tokenDto: TokenDto) {
    return await this.commandBus.execute(new UpdateTokenCommand(tokenDto));
  }

  async deleteToken(tokenIdDto: TokenIdRequestParamsDto) {
    return await this.commandBus.execute(new DeleteTokenCommand(tokenIdDto));
  }

  async findTokens(getTokensQuery: GetTokensQuery) {
    var query = new GetTokensQuery();
    Object.assign(query, getTokensQuery);
    return await this.queryBus.execute(query);
  }

  async findOne(findTokenQuery: FindTokenQuery): Promise<TokenDto> {
    var query = new FindTokenQuery();
    Object.assign(query, findTokenQuery);
    return await this.queryBus.execute(query);
  }
}
