import {CanActivate, Injectable, Logger} from "@nestjs/common";
import {AuthService} from "../auth.service";
import {Repository} from "typeorm";
import {UserDto} from "../../users/dtos/users.dto";
import {CONSTANTS} from "../../common/constant";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(UserDto)
        private userRepository: Repository<UserDto>,
    ) {
    }

    async canActivate(context: import("@nestjs/common").ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const id = request.params['_id'] || request.params['id'] || request.params['userId'];
        if (!id) return true;

        const payload = this.authService.decode(request);
        if (payload['roles'] && payload['roles'].findIndex(x => x.name === CONSTANTS.ROLE.ADMIN) !== -1) return true;
        if (payload['id'] === id) return true;

        const user = await this.userRepository.findOne({_id: id});
        if (user['assignerId'] !== payload['id']) {
            Logger.warn('User do not have permission to modify this user.', 'UserGuard');
            return false;
        }
        return true;
    }
}