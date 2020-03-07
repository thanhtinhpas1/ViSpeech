import { Injectable, Logger } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UserDto, UserIdRequestParamsDto } from "../dtos/users.dto";
import { UpdateUserCommand } from "../commands/impl/update-user.command";
import { DeleteUserCommand } from "../commands/impl/delete-user.command";
import { GetUsersQuery } from "users/queries/impl/get-users.query";
import { FindUserQuery } from "users/queries/impl/find-user.query";
import { CreateUserStartCommand } from "users/commands/impl/create-user.command";
import { AssignRoleUserCommand } from "users/commands/impl/assign-role-user.command";

@Injectable()
export class UsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  async createUserStart(transactionId: string, userDto: UserDto) {
    return await this.commandBus.execute(new CreateUserStartCommand(transactionId, userDto));
  }

  async updateUser(userDto: UserDto) {
    Logger.log(userDto, "service")
    return await this.commandBus.execute(new UpdateUserCommand(userDto));
  }

  async deleteUser(transactionId: string, userIdDto: UserIdRequestParamsDto) {
    return await this.commandBus.execute(new DeleteUserCommand(transactionId, userIdDto));
  }

  async findUsers(getUsersQuery: GetUsersQuery) {
    const query = new GetUsersQuery();
    Object.assign(query, getUsersQuery);
    return await this.queryBus.execute(query);
  }

  async findOne(findUserQuery: FindUserQuery): Promise<UserDto> {
    const query = new FindUserQuery(findUserQuery.id);
    return await this.queryBus.execute(query);
  }

  async assignRoleUser(userId: string, roleName: string[]) {
    return await this.commandBus.execute(new AssignRoleUserCommand(userId, roleName));
  }
}
