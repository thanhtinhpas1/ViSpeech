import { Injectable, CanActivate } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(context: import("@nestjs/common").ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        if (!roles || !request.user) {
            return true;
        }
        const user = request.user;
        return this.matchRoles(roles, user.roles);
    }

    matchRoles(roles: string[], userRoles: string[]) {
        // TODO: implement permission
        return false;
    }
}