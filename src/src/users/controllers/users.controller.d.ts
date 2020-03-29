import { AuthService } from 'auth/auth.service';
import { FindUserQuery } from 'users/queries/impl/find-user.query';
import { GetUsersQuery } from 'users/queries/impl/get-users.query';
import { ChangePasswordBody, UserDto, UserIdRequestParamsDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';
export declare class UsersController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    createUser(userDto: UserDto): Promise<UserDto>;
    updateUser(userIdDto: UserIdRequestParamsDto, userDto: UserDto): Promise<UserDto>;
    changePassword(body: ChangePasswordBody, request: any): Promise<any>;
    deleteUser(userIdDto: UserIdRequestParamsDto, request: any): Promise<any>;
    sendVerifyEmail(userIdDto: UserIdRequestParamsDto): Promise<any>;
    verifyEmail(emailToken: string): Promise<any>;
    findOneUser(findUserQuery: FindUserQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    getUsers(getUsersQuery: GetUsersQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
}
