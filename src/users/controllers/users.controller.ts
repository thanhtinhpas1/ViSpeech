import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UnauthorizedException, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {AuthService} from 'auth/auth.service';
import {Roles} from 'auth/roles.decorator';
import {CONSTANTS} from 'common/constant';
import {FindUserQuery} from 'users/queries/impl/find-user.query';
import {GetUsersQuery} from 'users/queries/impl/get-users.query';
import {ChangePasswordBody, UserDto, UserIdRequestParamsDto} from '../dtos/users.dto';
import {UsersService} from '../services/users.service';
import {UserGuard, VerifyEmailGuard} from 'auth/guards/user.guard';
import {Utils} from 'utils';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService) {
    }

    /* Create user
    /*--------------------------------------------*/
    @ApiOperation({tags: ['Create User']})
    @ApiResponse({status: 200, description: 'Create User.'})
    @Post()
    async createUser(@Body() userDto: UserDto): Promise<UserDto> {
        const streamId = userDto._id;
        return await this.usersService.createUserStart(streamId, userDto);
    }

    /* Update User */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Update User']})
    @ApiResponse({status: 200, description: 'Update User.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), UserGuard)
    @Put(':_id')
    async updateUser(
        @Param() userIdDto: UserIdRequestParamsDto,
        @Body() userDto: UserDto,
    ): Promise<UserDto> {
        const streamId = userIdDto._id;
        return this.usersService.updateUser(streamId, {...userDto, _id: userIdDto._id});
    }

    /* Change password */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Change password']})
    @ApiResponse({status: 200, description: 'Change password.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
    @Put('change-password')
    async changePassword(@Body() body: ChangePasswordBody, @Req() request) {
        if (!body || !body.oldPassword || !body.newPassword) throw new BadRequestException();
        const payload = this.authService.decode(request);
        if (!payload) throw new UnauthorizedException();
        const streamId = payload['id'];
        return this.usersService.changePassword(streamId, payload['id'], body.newPassword, body.oldPassword);
    }

    /* Delete User */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Delete User']})
    @ApiResponse({status: 200, description: 'Delete User.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), UserGuard)
    @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
    @Delete(':_id')
    async deleteUser(@Param() userIdDto: UserIdRequestParamsDto, @Req() request) {
        const payload = this.authService.decode(request);
        if (payload['id'] === userIdDto._id) throw new BadRequestException();
        const streamId = userIdDto._id;
        return this.usersService.deleteUser(streamId, userIdDto);
    }

    /* Send Verify email */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Send Verify Email']})
    @ApiResponse({status: 200, description: 'Send Verify Email.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), UserGuard)
    @Roles([CONSTANTS.ROLE.USER])
    @Post('send-verify-email')
    async sendVerifyEmail(@Body() userIdDto: UserIdRequestParamsDto) {
        const streamId = userIdDto._id;
        return this.usersService.sendVerifyEmail(streamId, userIdDto);
    }

    /* Verify email */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Verify Email']})
    @ApiResponse({status: 200, description: 'Verify Email.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), VerifyEmailGuard)
    @Roles([CONSTANTS.ROLE.USER])
    @Post('verify-email')
    async verifyEmail(@Body() emailToken: string) {
        const streamId = Utils.getUuid();
        return this.usersService.verifyEmail(streamId, emailToken);
    }

    /* Find User */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Get User']})
    @ApiResponse({status: 200, description: 'Get User.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), UserGuard)
    @Get(':id')
    async findOneUser(@Param() findUserQuery: FindUserQuery) {
        return await this.usersService.findOne(findUserQuery);
    }

    /* List Users */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['List Users']})
    @ApiResponse({status: 200, description: 'List Users.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), UserGuard)
    @Roles([CONSTANTS.ROLE.MANAGER_USER, CONSTANTS.ROLE.ADMIN])
    @Get()
    async getUsers(@Query() getUsersQuery: GetUsersQuery, @Req() request) {
        const payload = this.authService.decode(request);
        getUsersQuery.userId = payload['id'];
        return this.usersService.getUsers(getUsersQuery);
    }

    /* Assign role to user */
    // @ApiOperation({tags: ['Assign Role']})
    // @ApiResponse({status: 200, description: 'Assign role to user'})
    // @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), AssignRoleGuard)
    // @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
    // @Put(':_id/roles')
    // async assignRoleToUser(@Body() body: AssignUserRoleBody, @Param() userIdDto: UserIdRequestParamsDto, @Req() request) {
    //     const payload = this.authService.decode(request);
    //     const assignerId = payload['id'];
    //     const streamId = userIdDto._id;
    //     return this.usersService.assignUserRole(streamId, userIdDto._id, body.roleName, assignerId);
    // }
}
