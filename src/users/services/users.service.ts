import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserIdRequestParamsDto } from '../dtos/users.dto';
import { UserDto } from '../dtos/users.dto';
import { CreateUserCommand } from '../commands/impl/create-user.command';
import { UpdateUserCommand } from '../commands/impl/update-user.command';
import { DeleteUserCommand } from '../commands/impl/delete-user.command';
import { GetUsersQuery } from 'users/queries/impl';
import { FindUserQuery } from 'users/queries/impl/find-user.query';

@Injectable()
export class UsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) { }

  async createUser(user: UserDto) {
    return await this.commandBus.execute(
      new CreateUserCommand(user),
    );
  }

  async updateUser(user: UserDto) {
    return await this.commandBus.execute(
      new UpdateUserCommand(user),
    );
  }

  async deleteUser(user: UserIdRequestParamsDto) {
    return await this.commandBus.execute(
      new DeleteUserCommand(user),
    );
  }

  async findUsers(usersQuery: GetUsersQuery) {
    var query = new GetUsersQuery();
    Object.assign(query, usersQuery);
    return await this.queryBus.execute(query);
  }

  async findOne(userQuery: FindUserQuery): Promise<UserDto> {
    var query = new FindUserQuery();
    Object.assign(query, userQuery);
    return await this.queryBus.execute(query);
  }
}
