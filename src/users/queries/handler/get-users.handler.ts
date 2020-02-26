import { GetUsersQuery } from "../impl/get-users.query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "users/dtos/users.dto";
import { Repository } from "typeorm";

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
  ) {}

  async execute(query: GetUsersQuery) {
    try {
      Logger.log("Async GetUsersQuery...", "GetUsersQuery");
      if (query.limit && query.offset)
        return await this.repository.find({
          skip: Number(query.offset),
          take: Number(query.limit)
        });
      return await this.repository.find();
    } catch (error) {
      Logger.error(error, "GetUsersQuery");
    }
  }
}
