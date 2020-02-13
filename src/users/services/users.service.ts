import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UserIdRequestParamsDto } from "../dtos/users.dto";
import { UserDto } from "../dtos/users.dto";
import { CreateUserCommand } from "../commands/impl/create-user.command";
import { UpdateUserCommand } from "../commands/impl/update-user.command";
import { DeleteUserCommand } from "../commands/impl/delete-user.command";
import { GetUsersQuery } from "users/queries/impl/get-users.query";
import { FindUserQuery } from "users/queries/impl/find-user.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
  ) {}

  async createUser(userDto: UserDto) {
    return await this.commandBus.execute(new CreateUserCommand(userDto));
  }

  async updateUser(userDto: UserDto) {
    return await this.commandBus.execute(new UpdateUserCommand(userDto));
  }

  async deleteUser(userId: UserIdRequestParamsDto) {
    return await this.commandBus.execute(new DeleteUserCommand(userId));
  }

  async findUsers(getUsersQuery: GetUsersQuery) {
    var query = new GetUsersQuery();
    Object.assign(query, getUsersQuery);
    return await this.queryBus.execute(query);
  }

  async findOne(findUserQuery: FindUserQuery): Promise<UserDto> {
    var query = new FindUserQuery();
    Object.assign(query, findUserQuery);
    return await this.queryBus.execute(query);
  }

  async findByUsername(username: string) {
    return this.repository.findOne({ username });
  }
}
