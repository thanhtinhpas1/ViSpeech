import { GetUsersQuery } from "../impl";
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
    Logger.log("Async GetUsersQuery...");
    if (query.limit && query.offset)
      return this.repository.find({
        skip: Number(query.offset),
        take: Number(query.limit)
      });
    return this.repository.find();
  }
}
