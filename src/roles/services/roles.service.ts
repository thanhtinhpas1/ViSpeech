import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleDto } from "roles/dtos/roles.dto";

@Injectable()
export class RolesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectRepository(RoleDto) private readonly repository: Repository<RoleDto>
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
