import { CanActivate, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { QueryBus } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { CONSTANTS } from "../common/constant";
import { FindUserQuery } from "../users/queries/impl/find-user.query";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly queryBus: QueryBus
  ) { }

  canActivate(
    context: import("@nestjs/common").ExecutionContext
  ): boolean | Promise<boolean> | import("rxjs").Observable<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    const request = context.switchToHttp().getRequest();
    if (!roles) {
      return true;
    }
    // @ts-ignore
    return this.matchRoles(request, roles);
  }

  async matchRoles(request, roles: string[]) {
    try {
      const authorization = request.headers.authorization;
      if (!authorization) return false;
      const jwt = authorization.replace(CONSTANTS.BEARER_HEADER_AUTHORIZE, "");
      const payload = this.jwtService.decode(jwt);
      if (!payload) return false;
      const id = payload["id"];
      const user = await this.queryBus.execute(new FindUserQuery(id));
      const userRoles = user["roles"];
      const match = userRoles.filter(x => roles.includes(x.name));
      if (match.length > 0) return true;
      return false;
    } catch (e) {
      console.trace(e.message);
      return false;
    }
  }
}
