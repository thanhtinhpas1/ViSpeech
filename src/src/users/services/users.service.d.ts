import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserDto, UserIdRequestParamsDto } from '../dtos/users.dto';
import { GetUsersQuery } from 'users/queries/impl/get-users.query';
import { FindUserQuery } from 'users/queries/impl/find-user.query';
export declare class UsersService {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    createUserStart(streamId: string, userDto: UserDto): Promise<any>;
    updateUser(streamId: string, userDto: UserDto): Promise<any>;
    deleteUser(streamId: string, userIdDto: UserIdRequestParamsDto): Promise<any>;
    sendVerifyEmail(streamId: string, userIdDto: UserIdRequestParamsDto): Promise<any>;
    verifyEmail(streamId: string, emailToken: string): Promise<any>;
    changePassword(streamId: string, userId: string, newPassword: string, oldPassword: string): Promise<any>;
    getUsers(getUsersQuery: GetUsersQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    findOne(findUserQuery: FindUserQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
}
