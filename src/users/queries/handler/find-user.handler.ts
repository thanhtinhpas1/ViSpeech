import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "users/dtos/users.dto";
import { FindUserQuery } from "../impl/find-user.query";

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery> {
  constructor(
    @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
  ) {}

  async execute(query: FindUserQuery): Promise<any> {
    try {
      Logger.log("Async FindUserQuery...", "FindUserQuery");
      return await this.repository.findOne({ _id: query.id });
    } catch (error) {
      Logger.error(error, "", "FindUserQuery");
    }
  }
}
