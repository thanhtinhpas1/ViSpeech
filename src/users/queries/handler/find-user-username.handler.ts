import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindUserByUsernameQuery } from "../impl/find-user.query";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "../../dtos/users.dto";
import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";

@QueryHandler(FindUserByUsernameQuery)
export class FindUserUsernameHandler
  implements IQueryHandler<FindUserByUsernameQuery> {
  constructor(
    @InjectRepository(UserDto)
    private readonly userRepository: Repository<UserDto>
  ) {}

  async execute(query: FindUserByUsernameQuery): Promise<any> {
    try {
        Logger.log("Async FindUserByUsernameQuery...", "FindUserByUsernameQuery");
        return await this.userRepository.findOne({ username: query.username });
      } catch (error) {
        Logger.error(error, "", "FindUserByUsernameQuery");
      }
    
  }
}
