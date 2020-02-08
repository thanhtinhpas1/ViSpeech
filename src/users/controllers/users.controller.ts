import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UserIdRequestParamsDto } from '../dtos/users.dto';
import { UserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /* Create User */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Create User'] })
  @ApiResponse({ status: 200, description: 'Create User.' })
  @Post()
  async createUser(@Body() userDto: UserDto): Promise<UserDto> {
    return this.usersService.createUser(userDto);
  }

  /* Update User */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Update User'] })
  @ApiResponse({ status: 200, description: 'Update User.' })
  @Put(':userId')
  async updateUser(@Param() userId: UserIdRequestParamsDto, @Body() userDto: UserDto) {
    return this.usersService.updateUser({ ...userId, ...userDto });
  }

  /* Delete User */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Delete User'] })
  @ApiResponse({ status: 200, description: 'Delete User.' })
  @Delete(':userId')
  async deleteUser(@Param() userId: UserIdRequestParamsDto) {
    return this.usersService.deleteUser(userId);
  }

  /* List Users */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['List Users'] })
  @ApiResponse({ status: 200, description: 'List Users.' })
  @Get()
  async findUsers(@Param() param) {
    return this.usersService.findUsers();
  }

  /* TODO: Find User */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Get User'] })
  @ApiResponse({ status: 200, description: 'Get User.' })
  @Get(':userId')
  async findOneUser(@Param() userId: UserIdRequestParamsDto) {
    return this.usersService.findUsers();
  }
}
