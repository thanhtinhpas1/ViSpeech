import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindTokenQuery } from "../impl/find-token.query";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";

@QueryHandler(FindTokenQuery)
export class FindTokenHandler implements IQueryHandler<FindTokenQuery> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>
  ) {}

  async execute(query: FindTokenQuery): Promise<any> {
    Logger.log("Async FindTokenQuery...", "FindTokenQuery");
    try {
      return await this.repository.findOne(query.id);
    } catch (error) {
      Logger.error(error, "", "FindTokenQuery");
    }
  }
}
