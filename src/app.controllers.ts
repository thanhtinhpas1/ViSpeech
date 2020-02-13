import { Controller, UseGuards, Post, Request, Get } from "@nestjs/common";
import { AuthService } from "auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "users/services/users.service";

@Controller()
export class HomeController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersSerive: UsersService
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
    }
}