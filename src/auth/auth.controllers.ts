import { Controller, UseGuards, Post, Request, Get, Injectable, Inject } from "@nestjs/common";
import { AuthService } from "auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "users/services/users.service";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersSerive: UsersService
  ) { }

  @UseGuards(AuthGuard("local"))
  @Post("login")
  login(@Request() req) {
    const { id, username } = req.user;
    const access_token = this.authService.generate_token(id, username);
    req.user.token = access_token;
    return req.user;
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  getProfile(@Request() req) { }

  @UseGuards(AuthGuard("jwt"))
  @Get("authenticate")
  authenticate(@Request() req) {
    return req.user;
  }
}
