import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindUserQuery } from "../impl/find-user.query";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "users/dtos/users.dto";
import { Repository } from "typeorm";

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery> {
  constructor(
    @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
  ) {}

  async execute(query: FindUserQuery): Promise<any> {
    try {
      Logger.log("Async FindUserQuery...", "FindUserQuery");
      return await this.repository.findOne(query.id);
    } catch (error) {
      Logger.error(error, "", "FindUserQuery");
    }
  }
}
