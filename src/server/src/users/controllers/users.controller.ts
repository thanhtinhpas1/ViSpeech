import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    NotAcceptableException,
    OnModuleInit,
    Param,
    Post,
    Put,
    Query,
    Req,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
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
import {ClientKafka} from '@nestjs/microservices';
import {config} from '../../../config';
import {GetAssigneeQuery} from "../queries/impl/get-assignee.query";
import {ProjectGuard} from "../../auth/guards/project.guard";

@Controller('users')
@ApiTags('Users')
export class UsersController implements OnModuleInit {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
    }

    onModuleInit() {
        this.clientKafka.subscribeToResponseOf('vispeech-user');
    }

    /* Create user
    /*--------------------------------------------*/
    @ApiOperation({tags: ['Create User']})
    @ApiResponse({status: 200, description: 'Create User.'})
    @Post()
    async createUser(@Body() userDto: UserDto, @Req() request): Promise<UserDto> {
        if (!request.body.roles || !Array.isArray(request.body.roles)) {
            throw new BadRequestException("Missing user roles or user roles must be an array.");
        }
        request.body.roles.forEach(role => {
            if (typeof role !== "object" || !Utils.isValidRole(role.name)) {
                throw new BadRequestException("User role is not a valid role.");
            }
        });
        const streamId = userDto._id;
        return await this.usersService.createUserStart(streamId, userDto);
    }

    /* Change password */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Change password']})
    @ApiResponse({status: 200, description: 'Change password.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
    @Put('change-password')
    async changePassword(@Body() changePasswordBody: ChangePasswordBody, @Req() request) {
        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }
        if (!request.body.userId || request.body.userId !== payload['id']) {
            throw new BadRequestException("Missing user id or user does not have permission to change password.");
        }

        const streamId = changePasswordBody.userId;
        return this.usersService.changePassword(streamId, changePasswordBody);
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

    /* Delete User */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Delete User']})
    @ApiResponse({status: 200, description: 'Delete User.'})
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
    @ApiOperation({tags: ['Send Verify Email']})
    @ApiResponse({status: 200, description: 'Send Verify Email.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
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
    async verifyEmail(@Body() body) {
        const streamId = Utils.getUuid();
        const emailToken = body['emailToken'];
        return this.usersService.verifyEmail(streamId, emailToken);
    }

    /* Find User */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Find User']})
    @ApiResponse({status: 200, description: 'Find User.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), UserGuard)
    @Get(':id')
    async findOneUser(@Param() findUserQuery: FindUserQuery) {
        return await this.usersService.findOne(findUserQuery);
    }

    /* List Users */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['List Users']})
    @ApiResponse({status: 200, description: 'List Users.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Get()
    async getUsers(@Query() getUsersQuery: GetUsersQuery) {
        return this.usersService.getUsers(getUsersQuery);
    }

    /* Get Users assignee by project id */

    @ApiOperation({tags: ['List Users in project']})
    @ApiResponse({status: 200, description: 'List Users in project'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ProjectGuard)
    @Get('assignees/:projectId')
    async getUsersAssignee(@Param() getAssigneeQuery: GetAssigneeQuery) {
        return await this.usersService.getUserAssignee(getAssigneeQuery);
    }
}
