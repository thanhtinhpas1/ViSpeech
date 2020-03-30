import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from 'auth/auth.service';
import { Utils } from 'utils';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req) {
        const {_id, username, roles} = req.user;
        req.user.token = this.authService.generateToken(_id, username, roles);
        return req.user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        delete req.password;
        return req.user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('authenticate')
    authenticate(@Request() req) {
        return req.user;
    }
}
