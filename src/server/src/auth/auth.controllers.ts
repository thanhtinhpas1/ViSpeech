import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from 'auth/auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req) {
        const {_id, username, roles} = req.user;
        req.user.jwtToken = this.authService.generateToken(_id, username, roles);
        return req.user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(AuthGuard('facebook-token'))
    @Post('login-facebook')
    loginWithFacebook(@Request() req) {
        if (req.user._id) {
            const {_id, username, roles} = req.user;
            req.user.jwtToken = this.authService.generateToken(_id, username, roles);
        }
        return req.user;
    }

    @UseGuards(AuthGuard('google-token'))
    @Post('login-google')
    loginWithGoogle(@Request() req) {
        if (req.user._id) {
            const {_id, username, roles} = req.user;
            req.user.jwtToken = this.authService.generateToken(_id, username, roles);
        }
        return req.user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('authenticate')
    authenticate(@Request() req) {
        return req.user;
    }
}
