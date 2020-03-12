import { GetTokensQuery, GetTokenTypesQuery } from "../impl/get-tokens.query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository, getMongoRepository } from "typeorm";
import { TokenTypeDto } from "tokens/dtos/token-types.dto";

@QueryHandler(GetTokensQuery)
export class GetTokensHandler implements IQueryHandler<GetTokensQuery> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>
  ) {}

  async execute(query: GetTokensQuery) {
    try {
      Logger.log("Async GetTokensHandler...", "GetTokensQuery");
      if (query.limit && query.offset)
        return await this.repository.find({
          skip: Number(query.offset),
          take: Number(query.limit)
        });
      return await this.repository.find();
    } catch (error) {
      Logger.error(error, "", "GetTokensQuery");
    }
  }
}

@QueryHandler(GetTokenTypesQuery)
export class GetTokenTypesHandler implements IQueryHandler<GetTokenTypesQuery> {
  async execute(query: GetTokenTypesQuery) {
    try {
      Logger.log("Async GetTokenTypesHandler...", "GetTokenTypesQuery");
      return await getMongoRepository(TokenTypeDto).find();
    } catch (error) {
      Logger.error(error, "", "GetTokenTypesQuery");
    }
  }
}
