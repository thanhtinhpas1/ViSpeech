import { BadRequestException, CanActivate, Injectable, Logger, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { getMongoRepository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { Utils } from 'utils';
import { JwtService } from '@nestjs/jwt';
import { UserUtils } from '../../utils/user.util';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { CONSTANTS } from 'common/constant';

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    async canActivate(context: import ('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }
        const id = request.params['_id'] || request.params['id'] || request.params['userId'];
        if (!id) return true;
        if (UserUtils.isAdmin(payload['roles'])) return true;
        if (payload['id'] === id) {
            return true;
        }
        Logger.warn('User does not have permission to modify this user.', 'UserGuard');
        return false;
    }
}

@Injectable()
export class VerifyEmailGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {
    }

    async canActivate(context: import ('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const { emailToken } = request.body;
        const requestJwt = this.authService.decode(request);
        if (!requestJwt || !requestJwt['id'] || !requestJwt['roles']) {
            throw new UnauthorizedException();
        }
        const decodedEmailToken = this.jwtService.decode(emailToken);
        const userId = decodedEmailToken['id'];
        const exp = decodedEmailToken['exp'];
        if (!decodedEmailToken || !userId) {
            throw new BadRequestException('Token is invalid.');
        }
        if (Utils.tokenExpired(`${exp}000`)) {
            throw new BadRequestException('Token is expired.');
        }
        const user = await getMongoRepository(UserDto).findOne({ _id: userId });
        return user && !Utils.isEmailVerified(user.roles) && userId === requestJwt['id'];
    }
}

@Injectable()
export class GetProjectAssigneesGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    async canActivate(context: import ('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }
        const projectId = request.params.projectId;
        if (projectId) {
            if (UserUtils.isAdmin(payload['roles'])) return true;

            const project = await getMongoRepository(ProjectDto).findOne({ _id: projectId });
            if (!project) throw new NotFoundException(`Project with _id ${projectId} does not exist.`);
            if (project.userId === payload['id']) return true;
            // verify assignee
            const permission = await getMongoRepository(PermissionDto).findOne({ assignerId: project.userId, assigneeId: payload['id'], projectId,
                status: CONSTANTS.STATUS.ACCEPTED });
            if (permission && project.isValid) return true;
        }
        return false;
    }
}