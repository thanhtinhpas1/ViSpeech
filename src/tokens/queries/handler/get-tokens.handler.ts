import { GetTokensQuery } from "../impl/get-tokens.query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";

@QueryHandler(GetTokensQuery)
export class GetTokensHandler implements IQueryHandler<GetTokensQuery> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>
  ) {}

  async execute(query: GetTokensQuery) {
    try {
      Logger.log("Async GetTokensQuery...", "GetTokensQuery");
      if (query.limit && query.offset)
        return await this.repository.find({
          skip: Number(query.offset),
          take: Number(query.limit)
        });
      return await this.repository.find();
    } catch (error) {
      Logger.error(error, "GetTokensQuery");
    }
  }
}
