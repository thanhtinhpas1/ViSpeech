import {BadRequestException, CanActivate, Injectable, Logger} from "@nestjs/common";
import {AuthService} from "../auth.service";
import {Repository} from "typeorm";
import {UserDto} from "../../users/dtos/users.dto";
import {CONSTANTS} from "../../common/constant";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AssignRoleGuard implements CanActivate {
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
        if (payload['roles']) {
            if (payload['roles'].filter(x => x.name === CONSTANTS.ROLE.ADMIN).length > 0) return true;
            else if (payload['roles'].filter(x => x.name === CONSTANTS.ROLE.MANAGER_USER).length > 0) {
                const user = await this.userRepository.findOne({_id: id});
                if (!user && !user['roles']) throw new BadRequestException();
                if (user['roles'].filter(x => x.name === CONSTANTS.ROLE.USER).length >= 0
                    || user.assignerId === payload['id']) {
                    return true;
                }
                Logger.warn('User do not have permission to modify this user.', 'UserGuard');
                return false;
            }
        }
        return payload['id'] === id;
    }
}