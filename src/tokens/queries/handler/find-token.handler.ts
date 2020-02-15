import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindTokenQuery } from "../impl/find-token.query";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";

@QueryHandler(FindTokenQuery)
export class FindTokenHandler implements IQueryHandler<FindTokenQuery> {
    constructor(@InjectRepository(TokenDto) private readonly repository: Repository<TokenDto>) { }

    execute(query: FindTokenQuery): Promise<any> {
        Logger.log("ASync FindTokenQuery...");
        return this.repository.findOne(query._id);
    }

}