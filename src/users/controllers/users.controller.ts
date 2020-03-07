import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindUserQuery } from "users/queries/impl/find-user.query";
import { GetUsersQuery } from "users/queries/impl/get-users.query";
import { Utils } from "utils";
import { UserDto, UserIdRequestParamsDto, AssignRoleUserBody } from "../dtos/users.dto";
import { UsersService } from "../services/users.service";

@Controller("users")
@ApiTags("Users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Create User"] })
  @ApiResponse({ status: 200, description: "Create User." })
  @Post()
  async createUser(@Body() userDto: UserDto): Promise<UserDto> {
    const transactionId = Utils.getUuid();
    return await this.usersService.createUserStart(transactionId, userDto);
  }

  /* Update User */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Update User"] })
  @ApiResponse({ status: 200, description: "Update User." })
  @Put(":_id")
  async updateUser(
    @Param() userIdDto: UserIdRequestParamsDto,
    @Body() userDto: UserDto
  ): Promise<UserDto> {
    return this.usersService.updateUser({ ...userDto, _id: userIdDto._id });
  }

  /* Delete User */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Delete User"] })
  @ApiResponse({ status: 200, description: "Delete User." })
  @Delete(":_id")
  async deleteUser(@Param() userIdDto: UserIdRequestParamsDto) {
    const transactionId = Utils.getUuid();
    return this.usersService.deleteUser(transactionId, userIdDto);
  }

  /* List Users */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["List Users"] })
  @ApiResponse({ status: 200, description: "List Users." })
  @Get()
  async findUsers(@Query() getUsersQuery: GetUsersQuery) {
    return this.usersService.findUsers(getUsersQuery);
  }

  /* Find User */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Get User"] })
  @ApiResponse({ status: 200, description: "Get User." })
  @Get(":id")
  async findOneUser(@Param() findUserQuery: FindUserQuery) {
    return this.usersService.findOne(findUserQuery);
  }

  /* Assign role to user */
  @ApiOperation({ tags: ['Assign Role'] })
  @ApiResponse({ status: 200, description: 'Assign role to user' })
  @Put(':_id/roles')
  async assignRoleToUser(@Body() body: AssignRoleUserBody, @Param() param: UserIdRequestParamsDto) {
    return this.usersService.assignRoleUser(param._id, body.roleName);
  }
}
