import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UserDto, UserIdRequestParamsDto } from "../dtos/users.dto";
import { UpdateUserCommand } from "../commands/impl/update-user.command";
import { DeleteUserCommand } from "../commands/impl/delete-user.command";
import { GetUsersQuery } from "users/queries/impl/get-users.query";
import { FindUserQuery } from "users/queries/impl/find-user.query";
import { CreateUserStartCommand } from "users/commands/impl/create-user-start.command";

@Injectable()
export class UsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async createUserStart(userDto: UserDto) {
    return await this.commandBus.execute(new CreateUserStartCommand(userDto));
  }

  async updateUser(userDto: UserDto) {
    return await this.commandBus.execute(new UpdateUserCommand(userDto));
  }

  async deleteUser(userIdDto: UserIdRequestParamsDto) {
    return await this.commandBus.execute(new DeleteUserCommand(userIdDto));
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
}
