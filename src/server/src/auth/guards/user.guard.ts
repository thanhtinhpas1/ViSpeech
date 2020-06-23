import { BadRequestException, CanActivate, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { getMongoRepository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { Utils } from 'utils';
import { JwtService } from '@nestjs/jwt';
import { UserUtils } from "../../utils/user.util";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }
        const id = request.params['_id'] || request.params['id'] || request.params['userId'];
        if (!id) return true;
        if (UserUtils.isAdmin(payload)) return true;
        if (payload['id'] === id) {
            return true;
        }
        Logger.warn('User does not have permission to modify this user.', 'UserGuard');
        return false;
    }
}

@Injectable()
export class VerifyEmailGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const { emailToken } = request.body;
        const requestJwt = this.authService.decode(request);
        if (!requestJwt || !requestJwt['id'] || !requestJwt['roles']) {
            throw new UnauthorizedException();
        }
        const decodedEmailToken = this.jwtService.decode(emailToken);
        if (!decodedEmailToken || !decodedEmailToken['id']) {
            throw new BadRequestException("Token is invalid.");
        }

        const user = await getMongoRepository(UserDto).findOne({ _id: decodedEmailToken['id'] });
        return user && !Utils.isEmailVerified(user.roles) && decodedEmailToken['id'] === requestJwt['id'];
    }
}