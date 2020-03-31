import {BadRequestException, CanActivate, Injectable, Logger, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {AuthService} from 'auth/auth.service';
import {CONSTANTS} from 'common/constant';
import {PermissionDto} from 'permissions/dtos/permissions.dto';
import {getMongoRepository} from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const id = request.params._id || request.params.id;
        if (!id) return true;

        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }
        
        const isAdmin = payload['roles'].findIndex(role => role.name === CONSTANTS.ROLE.ADMIN) !== -1;
        if (isAdmin) return true;

        const permission = await getMongoRepository(PermissionDto).findOne({_id: id});
        if (!permission) {
            throw new NotFoundException(`Permission with _id ${id} does not exist.`);
        }
        if (permission.assignerId === payload['id']) {
            return true;
        }

        Logger.warn('User do not have permission to modify this permission.', 'PermissionGuard');
        return false;
    }
}

@Injectable()
export class AssignPermissionGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }

        const { assigneeUsername, assignerId, projectId } = request.body;
        const assignee = await getMongoRepository(UserDto).findOne({ username: assigneeUsername });
        if (assignee) {
            const permission = await getMongoRepository(PermissionDto).findOne({ assignerId, assigneeId: assignee._id, projectId });
            if (permission || assignee._id === assignerId) {
                return false;
            }
        }

        const isAdmin = payload['roles'].findIndex(role => role.name === CONSTANTS.ROLE.ADMIN) !== -1;
        const isManagerUser = payload['roles'].findIndex(role => role.name === CONSTANTS.ROLE.MANAGER_USER) !== -1;
        if (isAdmin || (isManagerUser && assignerId === payload['id'])) {
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

@Injectable()
export class ReplyPermisisonAssignGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const { emailToken } = request.body;

        const requestJwt = this.authService.decode(request);
        if (!requestJwt || !requestJwt['id'] || !requestJwt['roles']) {
            throw new UnauthorizedException();
        }

        const decodedEmailToken = this.authService.decodeJwtToken(emailToken);
        if (!decodedEmailToken || !decodedEmailToken['assignerId'] || !decodedEmailToken['assigneeId'] || !decodedEmailToken['projectId'] || !decodedEmailToken['permissions']) {
            throw new BadRequestException("Token is invalid.");
        }

        const permission = await getMongoRepository(PermissionDto).findOne({ assignerId: decodedEmailToken['assignerId'], assigneeId: decodedEmailToken['assigneeId'], projectId: decodedEmailToken['projectId'], status: CONSTANTS.STATUS.PENDING });
        if (permission && decodedEmailToken['assigneeId'] === requestJwt['id']) {
            return true;
        }

        return false;
    }
}