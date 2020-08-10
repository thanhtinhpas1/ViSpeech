import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ChangePasswordBody, UserDto, UserIdRequestParamsDto, ResetPasswordBody } from '../dtos/users.dto';
import { UpdateUserCommand } from '../commands/impl/update-user.command';
import { DeleteUserCommand } from '../commands/impl/delete-user.command';
import { GetUsersQuery } from 'users/queries/impl/get-users.query';
import { FindUserQuery } from 'users/queries/impl/find-user.query';
import { ChangePasswordCommand } from '../commands/impl/change-password.command';
import { VerifyEmailCommand } from 'users/commands/impl/verify-email.command';
import { SendVerifyEmailCommand } from 'users/commands/impl/send-verify-email.command';
import { CreateUserCommand } from '../commands/impl/create-user.command';
import { GetProjectAssigneesQuery } from 'users/queries/impl/get-project-assignees.query';
import { GetUsernamesQuery } from 'users/queries/impl/get-usernames.query';
import { SendResetPasswordEmailCommand } from 'users/commands/impl/send-reset-password-email.command';
import { ResetPasswordCommand } from 'users/commands/impl/reset-password.command';

@Injectable()
export class UsersService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {
    }

    async createUser(streamId: string, userDto: UserDto) {
        return await this.commandBus.execute(new CreateUserCommand(streamId, userDto));
    }

    async updateUser(streamId: string, userDto: UserDto) {
        return await this.commandBus.execute(new UpdateUserCommand(streamId, userDto));
    }

    async deleteUser(streamId: string, userIdDto: UserIdRequestParamsDto) {
        return await this.commandBus.execute(new DeleteUserCommand(streamId, userIdDto, false));
    }

    async sendVerifyEmail(streamId: string, userIdDto: UserIdRequestParamsDto) {
        return await this.commandBus.execute(new SendVerifyEmailCommand(streamId, userIdDto));
    }

    async verifyEmail(streamId: string, emailToken: string) {
        return await this.commandBus.execute(new VerifyEmailCommand(streamId, emailToken));
    }

    async changePassword(streamId: string, changePasswordBody: ChangePasswordBody) {
        return await this.commandBus.execute(new ChangePasswordCommand(streamId, changePasswordBody));
    }

    async sendResetPasswordEmail(streamId: string, email: string) {
        return await this.commandBus.execute(new SendResetPasswordEmailCommand(streamId, email));
    }

    async resetPassword(streamId: string, resetPasswordBody: ResetPasswordBody) {
        return await this.commandBus.execute(new ResetPasswordCommand(streamId, resetPasswordBody));
    }

    async getUsers(getUsersQuery: GetUsersQuery) {
        const query = new GetUsersQuery();
        Object.assign(query, getUsersQuery);
        return await this.queryBus.execute(query);
    }

    async getUsernames(getUsernamesQuery: GetUsernamesQuery) {
        const query = new GetUsernamesQuery();
        Object.assign(query, getUsernamesQuery);
        return await this.queryBus.execute(query);
    }

    async findOne(findUserQuery: FindUserQuery) {
        const query = new FindUserQuery(findUserQuery.id);
        return await this.queryBus.execute(query);
    }

    async getProjectAssignees(getProjectAssigneesQuery: GetProjectAssigneesQuery) {
        const query = new GetProjectAssigneesQuery();
        Object.assign(query, getProjectAssigneesQuery);
        return await this.queryBus.execute(query);
    }
}
