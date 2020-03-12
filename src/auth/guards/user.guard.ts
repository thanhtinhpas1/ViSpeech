import { CanActivate, Injectable, Logger } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { getMongoRepository } from "typeorm";
import { UserDto } from "../../users/dtos/users.dto";
import { CONSTANTS } from "../../common/constant";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    canActivate(context: import("@nestjs/common").ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const id = request.params['_id'] || request.parms['id'];
        if (!id) return true;
        const payload = this.authService.decode(request);
        if (payload['roles'])
            if (payload['roles'].includes(CONSTANTS.ROLE.ADMIN)) return true;
        const user = getMongoRepository(UserDto).findOne({ _id: id });
        if (user['_id'] === id) return true;
        if (user['assignerId'] !== payload['id']) {
            Logger.warn('User do not have permission to modify this user.', 'UserGuard')
            return false;
        }
        return true;
    }
}