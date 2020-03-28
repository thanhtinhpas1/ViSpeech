import {CanActivate, Injectable, Logger} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {JwtService} from '@nestjs/jwt';
import {CONSTANTS} from '../common/constant';
import {QueryBus} from '@nestjs/cqrs';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private readonly queryBus: QueryBus,
    ) {
    }

    canActivate(
        context: import('@nestjs/common').ExecutionContext
    ): boolean | Promise<boolean> | import('rxjs').Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        if (!roles) {
            return true;
        }
        return this.matchRoles(request, roles);
    }

    async matchRoles(request, roles: string[]) {
        try {
            const authorization = request.headers.authorization;
            if (!authorization) return false;
            const jwt = authorization.replace(CONSTANTS.BEARER_HEADER_AUTHORIZE, '');
            const payload = this.jwtService.decode(jwt);
            if (!payload) return false;
            const userRoles = payload['roles'];
            const match = userRoles.filter(x => roles.includes(x.name));
            return match.length > 0;
        } catch (e) {
            Logger.warn('Authorize Roles by Guard failed', 'RolesGuard');
            return false;
        }
    }
}
