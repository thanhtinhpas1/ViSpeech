import {BadRequestException, CanActivate, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {AuthService} from '../auth.service';
import {CONSTANTS} from '../../common/constant';

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const id = request.params['_id'] || request.params['id'] || request.params['userId'];
        if (!id) return true;

        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }
        if (payload['roles'].includes(CONSTANTS.ROLE.ADMIN)) return true;
        if (payload['id'] === id) {
            return true;
        }

        Logger.warn('User do not have permission to modify this user.', 'UserGuard');
        return false;
    }
}

@Injectable()
export class VerifyEmailGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const emailToken = request.body;

        const requestJwt = this.authService.decode(request);
        if (!requestJwt || !requestJwt['id'] || !requestJwt['roles']) {
            throw new UnauthorizedException();
        }

        const decodedEmailToken = this.authService.decodeJwtToken(emailToken);
        if (!decodedEmailToken || !decodedEmailToken['id']) {
            throw new BadRequestException();
        }

        if (decodedEmailToken['id'] === requestJwt['id']) {
            return true;
        }

        return false;
    }
}