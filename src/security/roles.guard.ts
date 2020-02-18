import { Injectable, CanActivate, Inject } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "auth/constants";
import { UsersService } from "users/services/users.service";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ) { }

    canActivate(context: import("@nestjs/common").ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        if (!roles) {
            return true;
        }

        return this.matchRoles(request, roles);
    }

    matchRoles(request, roles: string[]) {
        var authorization = request.headers.authorization;
        if (!authorization) return false;
        const jwt = authorization.replace("Bearer ", "");
        var payload = this.jwtService.decode(jwtConstants.secret);
        console.log(payload);
        // load roles
        // var user = this.usersService.findUserRoles(payload.userId);
        return false;
    }
}