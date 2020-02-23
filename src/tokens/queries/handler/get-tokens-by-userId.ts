import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTokensByUserIdQuery } from "../impl/get-tokens-by-userId";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";

@QueryHandler(GetTokensByUserIdQuery)
export class GetTokensByUserIdHandler
  implements IQueryHandler<GetTokensByUserIdQuery> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>
  ) {}

  async execute(query: GetTokensByUserIdQuery): Promise<any> {
    try {
      Logger.log("Async GetTokensByUserIdQuery...", "GetTokensByUserIdQuery");
      return await this.repository.find({
        where: { userId: query.userId }
      });
    } catch (error) {
      Logger.error(error, "GetTokensByUserIdQuery");
    }
  }
}
