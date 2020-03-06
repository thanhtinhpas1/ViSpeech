import { Controller, Get, Post, Request, UseGuards, Body, Logger } from "@nestjs/common";
import { AuthService } from "auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { UserDto } from "users/dtos/users.dto";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  login(@Request() req) {
    const { _id, username } = req.user;
    req.user.token = this.authService.generate_token(_id, username);
    return req.user;
  }

  // @Post("register")
  // async register(@Body() userDto: UserDto) {
  //   const user = await this.authService.createUser(userDto)
  //   Logger.log(user, "REGISTER")
  //   return user;
  // }

  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  getProfile(@Request() req) {
    delete req.password;
    return req.user;
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("authenticate")
  authenticate(@Request() req) {
    return req.user;
  }
}
