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

    async createUserStart(streamId: string, userDto: UserDto) {
        return await this.commandBus.execute(new CreateUserStartCommand(streamId, userDto));
    }

    async updateUser(streamId: string, userDto: UserDto) {
        return await this.commandBus.execute(new UpdateUserCommand(streamId, userDto));
    }

    async deleteUser(streamId: string, userIdDto: UserIdRequestParamsDto) {
        return await this.commandBus.execute(new DeleteUserCommand(streamId, userIdDto));
    }

    async assignUserRole(streamId: string, userId: string, roleName: string, assignerId: string) {
        return await this.commandBus.execute(new AssignUserRoleCommand(streamId, userId, roleName, assignerId));
    }

    async changePassword(streamId: string, userId: string, newPassword: string, oldPassword: string) {
        return await this.commandBus.execute(new ChangePasswordCommand(streamId, userId, newPassword, oldPassword));
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
}
