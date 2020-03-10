import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { TokenDto, TokenIdRequestParamsDto } from "../dtos/tokens.dto";
import { CreateTokenCommand } from "../commands/impl/create-token.command";
import { UpdateTokenCommand } from "../commands/impl/update-token.command";
import { DeleteTokenCommand } from "../commands/impl/delete-token.command";
import { GetTokensQuery, GetTokenTypesQuery } from "tokens/queries/impl/get-tokens.query";
import { GetTokensByUserIdQuery } from "tokens/queries/impl/get-tokens-by-userId";
import { FindTokenQuery } from "tokens/queries/impl/find-token.query";

@Injectable()
export class TokensService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async createToken(transactionId: string, tokenDto: TokenDto) {
    return await this.commandBus.execute(
      new CreateTokenCommand(transactionId, tokenDto)
    );
  }

  async updateToken(tokenDto: TokenDto) {
    return await this.commandBus.execute(new UpdateTokenCommand(tokenDto));
  }

  async deleteToken(transactionId: string, tokenIdDto: TokenIdRequestParamsDto) {
    return await this.commandBus.execute(new DeleteTokenCommand(transactionId, tokenIdDto));
  }

  async findTokens(getTokensQuery: GetTokensQuery) {
    const query = new GetTokensQuery();
    Object.assign(query, getTokensQuery);
    return await this.queryBus.execute(query);
  }

  async findTokenTypes(getTokenTypesQuery: GetTokenTypesQuery) {
    const query = new GetTokenTypesQuery();
    Object.assign(query, getTokenTypesQuery);
    return await this.queryBus.execute(query);
  }

  async getTokensByUserId(getTokensByUserIdQuery: GetTokensByUserIdQuery) {
    const query = new GetTokensByUserIdQuery(getTokensByUserIdQuery.userId);
    return await this.queryBus.execute(query);
  }

  async findOne(findTokenQuery: FindTokenQuery): Promise<TokenDto> {
    const query = new FindTokenQuery(findTokenQuery.id);
    return await this.queryBus.execute(query);
  }
}
