import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "auth/roles.decorator";
import { CONSTANTS } from "common/constant";
import { FindUserQuery } from "users/queries/impl/find-user.query";
import { GetUsersQuery } from "users/queries/impl/get-users.query";
import { Utils } from "utils";
import { AssignRoleUserBody, UserDto, UserIdRequestParamsDto } from "../dtos/users.dto";
import { UsersService } from "../services/users.service";

@Controller("users")
@ApiTags("Users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService) { }
  //TODO: verify manager just change in their user

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Create User"] })
  @ApiResponse({ status: 200, description: "Create User." })
  @Post()
  async createUser(@Body() userDto: UserDto, @Req() request): Promise<UserDto> {
    const transactionId = Utils.getUuid();
    return await this.usersService.createUserStart(transactionId, userDto);
  }

  /* Update User */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Update User"] })
  @ApiResponse({ status: 200, description: "Update User." })
  @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
  @Put(":_id")
  async updateUser(
    @Param() userIdDto: UserIdRequestParamsDto,
    @Body() userDto: UserDto,
    @Req() request
  ): Promise<UserDto> {
    const roles = Utils.getRolesFromJwt(request);
    if (!roles.include(CONSTANTS.ROLE.ADMIN) && !roles.include(CONSTANTS.ROLE.MANAGER_USER)) {
      if (userIdDto._id !== userDto._id) throw new UnauthorizedException();
    }
    delete userDto.password;
    return this.usersService.updateUser(userIdDto._id, { ...userDto, _id: userIdDto._id });
  }

  /* Delete User */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Delete User"] })
  @ApiResponse({ status: 200, description: "Delete User." })
  @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
  @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
  @Delete(":_id")
  async deleteUser(@Param() userIdDto: UserIdRequestParamsDto) {
    const transactionId = Utils.getUuid();
    return this.usersService.deleteUser(transactionId, userIdDto);
  }

  /* List Users */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["List Users"] })
  @ApiResponse({ status: 200, description: "List Users." })
  @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
  @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
  @Get()
  async findUsers(@Query() getUsersQuery: GetUsersQuery) {
    return this.usersService.findUsers(getUsersQuery);
  }

  /* Find User */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Get User"] })
  @ApiResponse({ status: 200, description: "Get User." })
  @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
  @Roles([CONSTANTS.ROLE.ADMIN])
  @Get(":id")
  async findOneUser(@Param() findUserQuery: FindUserQuery) {
    return this.usersService.findOne(findUserQuery);
  }

  /* Assign role to user */
  @ApiOperation({ tags: ['Assign Role'] })
  @ApiResponse({ status: 200, description: 'Assign role to user' })
  @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
  @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
  @Put(':_id/roles')
  async assignRoleToUser(@Body() body: AssignRoleUserBody, @Param() param: UserIdRequestParamsDto) {
    return this.usersService.assignRoleUser(param._id, body.roleName);
  }
}
