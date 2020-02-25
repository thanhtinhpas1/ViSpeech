import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {UserDto, UserIdRequestParamsDto} from '../dtos/users.dto';
import {UsersService} from '../services/users.service';
import {GetUsersQuery} from 'users/queries/impl/get-users.query';
import {FindUserQuery} from 'users/queries/impl/find-user.query';
import {Roles} from 'auth/roles.decorator';
import {CONSTANTS} from '../../common/constant';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    /* Create User */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Create User']})
    @ApiResponse({status: 200, description: 'Create User.'})
    @Post()
    async createUser(@Body() userDto: UserDto): Promise<UserDto> {
        return await this.usersService.createUser(userDto);
    }

    /* Update User */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Update User']})
    @ApiResponse({status: 200, description: 'Update User.'})
    @Put(':id')
    async updateUser(
        @Param() userIdDto: UserIdRequestParamsDto,
        @Body() userDto: UserDto,
    ) {
        return this.usersService.updateUser(userDto);
    }

    /* Delete User */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Delete User']})
    @ApiResponse({status: 200, description: 'Delete User.'})
    @Delete(':id')
    async deleteUser(@Param() userIdDto: UserIdRequestParamsDto) {
        return this.usersService.deleteUser(userIdDto);
    }

    /* List Users */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['List Users']})
    @ApiResponse({status: 200, description: 'List Users.'})
    @Get()
    async findUsers(@Query() getUsersQuery: GetUsersQuery) {
        return this.usersService.findUsers(getUsersQuery);
    }

    /* Find User */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Get User']})
    @ApiResponse({status: 200, description: 'Get User.'})
    @Get(':id')
    async findOneUser(@Param() findUserQuery: FindUserQuery) {
        return this.usersService.findOne(findUserQuery);
    }
}
