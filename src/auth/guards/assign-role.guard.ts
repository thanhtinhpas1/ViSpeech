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
        const paramId = request.params['_id'] || request.params['id'] || request.params['userId'];
        if (!paramId) return true;

        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new BadRequestException();
        }

        const isAdmin = payload['roles'].findIndex(x => x.name === CONSTANTS.ROLE.ADMIN) !== -1;
        const isManagerUser = payload['roles'].findIndex(x => x.name === CONSTANTS.ROLE.MANAGER_USER) !== -1;
        if (isAdmin || (isManagerUser && paramId !== payload['id'])) {
            return true;
        }
        return false;

        // if (payload['roles']) {
        //     if (payload['roles'].findIndex(x => x.name === CONSTANTS.ROLE.ADMIN) !== -1) return true;
        //     if (payload['roles'].findIndex(x => x.name === CONSTANTS.ROLE.MANAGER_USER) !== -1) {
        //         const user = await this.userRepository.findOne({ _id: id });
        //         if (!user || !user['roles']) throw new BadRequestException();
        //         if (payload['id'] === user.assignerId) return true;
        //         if (user['roles'].findIndex(x => x.name === CONSTANTS.ROLE.USER) !== -1
        //             || user.assignerId === payload['id']) {
        //             return true;
        //         }
        //         Logger.warn('User do not have permission to modify this user.', 'UserGuard');
        //         return false;
        //     }
        // }
        // return payload['id'] === id;
    }
}