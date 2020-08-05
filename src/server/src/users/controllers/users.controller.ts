import { JwtService } from '@nestjs/jwt';
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotAcceptableException,
    Param,
    Post,
    Put,
    Query,
    Req,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'auth/auth.service';
import { UserGuard, VerifyEmailGuard } from 'auth/guards/user.guard';
import { Roles } from 'auth/roles.decorator';
import { CONSTANTS } from 'common/constant';
import { FindUserQuery } from 'users/queries/impl/find-user.query';
import { GetUsersQuery } from 'users/queries/impl/get-users.query';
import { Utils } from 'utils';
import { ProjectGuard } from '../../auth/guards/project.guard';
import { ChangePasswordBody, UserDto, UserIdRequestParamsDto, ResetPasswordBody } from '../dtos/users.dto';
import { GetProjectAssigneesQuery } from 'users/queries/impl/get-project-assignees.query';
import { UsersService } from '../services/users.service';
import { UserUtils } from 'utils/user.util';
import { GetUsernamesQuery } from 'users/queries/impl/get-usernames.query';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {
    }

    /* Create user
    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Create User'] })
    @ApiResponse({ status: 200, description: 'Create User.' })
    @Post()
    async createUser(@Body() userDto: UserDto, @Req() request): Promise<UserDto> {
        if (!request.body.roles || !Array.isArray(request.body.roles)) {
            throw new BadRequestException('Missing user roles or user roles must be an array.');
        }
        request.body.roles.forEach(role => {
            if (typeof role !== 'object' || !Utils.isValidRole(role.name)) {
                throw new BadRequestException('User role is not a valid role.');
            }
        });
        const streamId = userDto._id;
        return await this.usersService.createUser(streamId, userDto);
    }

    /* Change password */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Change password'] })
    @ApiResponse({ status: 200, description: 'Change password.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
    @Put('change-password')
    async changePassword(@Body() changePasswordBody: ChangePasswordBody, @Req() request) {
        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }
        if (!request.body.userId || request.body.userId !== payload['id']) {
            throw new BadRequestException('Missing user id or user does not have permission to change password.');
        }

        const streamId = changePasswordBody.userId;
        return this.usersService.changePassword(streamId, changePasswordBody);
    }

    /* Update User */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Update User'] })
    @ApiResponse({ status: 200, description: 'Update User.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), UserGuard)
    @Put(':_id')
    async updateUser(
        @Param() userIdDto: UserIdRequestParamsDto,
        @Body() userDto: UserDto,
        @Req() request,
    ): Promise<UserDto> {
        const streamId = userIdDto._id;
        const payload = this.authService.decode(request);
        const isAdmin = UserUtils.isAdmin(payload['roles']);
        if (!isAdmin) {
            userDto = Utils.removePropertyFromObject(userDto, 'roles');
        }
        return this.usersService.updateUser(streamId, { ...userDto, _id: userIdDto._id });
    }

    /* Delete User */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Delete User'] })
    @ApiResponse({ status: 200, description: 'Delete User.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), UserGuard)
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Delete(':_id')
    async deleteUser(@Param() userIdDto: UserIdRequestParamsDto, @Req() request) {
        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }
        if (payload['id'] === userIdDto._id) {
            throw new NotAcceptableException();
        }
        const streamId = userIdDto._id;
        return this.usersService.deleteUser(streamId, userIdDto);
    }

    /* Send Verify email */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Send Verify Email'] })
    @ApiResponse({ status: 200, description: 'Send Verify Email.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
    @Roles([CONSTANTS.ROLE.USER])
    @Post('send-verify-email')
    async sendVerifyEmail(@Body() userIdDto: UserIdRequestParamsDto) {
        const streamId = userIdDto._id;
        return this.usersService.sendVerifyEmail(streamId, userIdDto);
    }

    /* Verify email */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Verify Email'] })
    @ApiResponse({ status: 200, description: 'Verify Email.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), VerifyEmailGuard)
    @Roles([CONSTANTS.ROLE.USER])
    @Post('verify-email')
    async verifyEmail(@Body() body) {
        const streamId = Utils.getUuid();
        const emailToken = body.emailToken;
        return this.usersService.verifyEmail(streamId, emailToken);
    }

    /* Send Reset Password Email */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Send Reset Password Email'] })
    @ApiResponse({ status: 200, description: 'Send Reset Password Email.' })
    @Post('send-reset-password-email')
    async sendResetPasswordEmail(@Body() body) {
        const streamId = Utils.getUuid();
        const email = body.email;
        return this.usersService.sendResetPasswordEmail(streamId, email);
    }

    /* Reset Password */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Reset Password'] })
    @ApiResponse({ status: 200, description: 'Reset Password.' })
    @Post('reset-password')
    async resetPassword(@Body() body: ResetPasswordBody) {
        const streamId = Utils.getUuid();
        const decodedEmailToken = this.jwtService.decode(body.emailToken);
        if (!decodedEmailToken['id']) {
            throw new NotAcceptableException();
        }
        body.userId = decodedEmailToken['id']
        return this.usersService.resetPassword(streamId, body);
    }

    /* List Users */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['List Users'] })
    @ApiResponse({ status: 200, description: 'List Users.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Get()
    async getUsers(@Query() getUsersQuery: GetUsersQuery) {
        return this.usersService.getUsers(getUsersQuery);
    }

    /* Get Usernames */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Get Usernames'] })
    @ApiResponse({ status: 200, description: 'Get Usernames.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
    @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
    @Get('usernames')
    async getUsernames(@Query() getUsernamesQuery: GetUsernamesQuery) {
        return this.usersService.getUsernames(getUsernamesQuery);
    }

    /* Get Users assignee by project id */

    @ApiOperation({ tags: ['List Users in project'] })
    @ApiResponse({ status: 200, description: 'List Users in project' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ProjectGuard)
    @Get('assignees/:projectId')
    async getProjectAssignees(@Param() query: GetProjectAssigneesQuery) {
        return await this.usersService.getProjectAssignees(query);
    }

    /* Find User */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Find User'] })
    @ApiResponse({ status: 200, description: 'Find User.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), UserGuard)
    @Get(':id')
    async findOneUser(@Param() findUserQuery: FindUserQuery) {
        return await this.usersService.findOne(findUserQuery);
    }
}
