import { CanActivate, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Utils } from 'utils';
import { getMongoRepository } from 'typeorm';
import { UserDto } from '../users/dtos/users.dto';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {
    }

    canActivate(
        context: import ('@nestjs/common').ExecutionContext
    ): boolean | Promise<boolean> | import ('rxjs').Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        if (!roles) {
            return true;
        }
        return this.matchRoles(request, roles);
    }

    async matchRoles(request, roles: string[]) {
        try {
            const jwt = Utils.extractToken(request);
            if (!jwt) return false;
            const payload = this.jwtService.decode(jwt);
            if (!payload) return false;
            const user = await getMongoRepository(UserDto).findOne({ _id: payload['id'] });
            const userRoles = user['roles'];
            const match = userRoles.filter(x => roles.includes(x.name));
            return match.length > 0;
        } catch (ex) {
            Logger.warn(ex.message, '[RolesGuard] Authorize Roles by Guard failed');
            return false;
        }
    }
}
