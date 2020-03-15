import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {UserDto, UserIdRequestParamsDto} from '../dtos/users.dto';
import {UpdateUserCommand} from '../commands/impl/update-user.command';
import {DeleteUserCommand} from '../commands/impl/delete-user.command';
import {GetUsersQuery} from 'users/queries/impl/get-users.query';
import {FindUserQuery} from 'users/queries/impl/find-user.query';
import {CreateUserStartCommand} from 'users/commands/impl/create-user.command';
import {ChangePasswordCommand} from '../commands/impl/change-password.command';
import { AssignUserRoleCommand } from 'users/commands/impl/assign-user-role.command';

@Injectable()
export class UsersService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    async createUserStart(_id: string, userDto: UserDto) {
        return await this.commandBus.execute(new CreateUserStartCommand(_id, userDto));
    }

    async updateUser(userDto: UserDto) {
        return await this.commandBus.execute(new UpdateUserCommand(userDto));
    }

    async deleteUser(userIdDto: UserIdRequestParamsDto) {
        return await this.commandBus.execute(new DeleteUserCommand(userIdDto));
    }

    async getUsers(getUsersQuery: GetUsersQuery) {
        const query = new GetUsersQuery(getUsersQuery.userId);
        Object.assign(query, getUsersQuery);
        return await this.queryBus.execute(query);
    }

    async findOne(findUserQuery: FindUserQuery) {
        const query = new FindUserQuery(findUserQuery.id);
        return await this.queryBus.execute(query);
    }

    async assignRoleUser(userId: string, roleName: string, assignerId: string) {
        return await this.commandBus.execute(new AssignUserRoleCommand(userId, roleName, assignerId));
    }

    async changePassword(userId: string, newPassword: string, oldPassword: string) {
        return await this.commandBus.execute(new ChangePasswordCommand(userId, newPassword, oldPassword));
    }
}
