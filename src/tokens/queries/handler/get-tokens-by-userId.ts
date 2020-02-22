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

  execute(query: GetTokensByUserIdQuery): Promise<any> {
    Logger.log("Async GetTokensByUserIdQuery...");
    return this.repository.find({
      relations: ["tokenType"],
      where: { userId: query.userId }
    });
  }
}
