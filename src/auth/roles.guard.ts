import { CanActivate, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { CONSTANTS } from "../common/constant";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  canActivate(
    context: import("@nestjs/common").ExecutionContext
  ): boolean | Promise<boolean> | import("rxjs").Observable<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    const request = context.switchToHttp().getRequest();
    if (!roles) {
      return true;
    }

    return this.matchRoles(request, roles);
  }

  matchRoles(request, roles: string[]) {
    const authorization = request.headers.authorization;
    if (!authorization) return false;
    const jwt = authorization.replace(CONSTANTS.BEARER_HEADER_AUTHORIZE, "");
    const payload = this.jwtService.decode(jwt);
    if (!payload) return false;
    // var user = this.usersService.findUserRoles(payload.userId);
    return false;
  }
}
