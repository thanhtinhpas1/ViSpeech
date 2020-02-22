import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { TokenTypeDto } from "tokens/dtos/token-types.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TokenTypesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectRepository(TokenTypeDto)
    private readonly repository: Repository<TokenTypeDto>
  ) {}

  //   async createToken(tokenDto: TokenDto) {
  //     return await this.commandBus.execute(new CreateTokenCommand(tokenDto));
  //   }

  //   async updateToken(tokenDto: TokenDto) {
  //     return await this.commandBus.execute(new UpdateTokenCommand(tokenDto));
  //   }

  //   async deleteToken(tokenIdDto: TokenIdRequestParamsDto) {
  //     return await this.commandBus.execute(new DeleteTokenCommand(tokenIdDto));
  //   }

  //   async findTokens(getTokensQuery: GetTokensQuery) {
  //     var query = new GetTokensQuery();
  //     Object.assign(query, getTokensQuery);
  //     return await this.queryBus.execute(query);
  //   }

  //   async findOne(findTokenQuery: FindTokenQuery): Promise<TokenDto> {
  //     var query = new FindTokenQuery();
  //     Object.assign(query, findTokenQuery);
  //     return await this.queryBus.execute(query);
  //   }

  async findByName(name: string) {
    return await this.repository.findOne({ name });
  }
}
