import { Injectable, Logger } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UserDto, UserIdRequestParamsDto } from "../dtos/users.dto";
import { UpdateUserCommand } from "../commands/impl/update-user.command";
import { DeleteUserCommand } from "../commands/impl/delete-user.command";
import { GetUsersQuery } from "users/queries/impl/get-users.query";
import { FindUserQuery } from "users/queries/impl/find-user.query";
import { CreateUserStartCommand } from "users/commands/impl/create-user.command";
import { AssignUserRoleCommand } from "users/commands/impl/assign-user-role.command";

@Injectable()
export class UsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async createUserStart(transactionId: string, userDto: UserDto) {
    return await this.commandBus.execute(
      new CreateUserStartCommand(transactionId, userDto)
    );
  }

  async updateUser(
    transactionId: string,
    updatedBy: string,
    roleNames: string[],
    userDto: UserDto
  ) {
    return await this.commandBus.execute(
      new UpdateUserCommand(transactionId, updatedBy, roleNames, userDto)
    );
  }

  async deleteUser(
    transactionId: string,
    updatedBy: string,
    roleNames: string[],
    userIdDto: UserIdRequestParamsDto
  ) {
    return await this.commandBus.execute(
      new DeleteUserCommand(transactionId, updatedBy, roleNames, userIdDto)
    );
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

  async assignUserRole(
    transactionId: string,
    userId: string,
    roleNames: string[],
    assignerId: string
  ) {
    return await this.commandBus.execute(
      new AssignUserRoleCommand(transactionId, userId, roleNames, assignerId)
    );
  }
}
