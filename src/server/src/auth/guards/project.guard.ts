import { CanActivate, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { CONSTANTS } from 'common/constant';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { getMongoRepository } from 'typeorm';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { UserUtils } from '../../utils/user.util';

@Injectable()
export class ProjectGuard implements CanActivate {
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
        const id = request.params._id || request.params.id;
        if (!id) return true;
        if (UserUtils.isAdmin(payload['roles'])) return true;

        const project = await getMongoRepository(ProjectDto).findOne({ _id: id });
        if (project && project.userId === payload['id']) {
            return true;
        }
        Logger.warn('User does not have permission to modify this project.', 'ProjectGuard');
        return false;
    }
}

@Injectable()
export class ProjectQueryGuard implements CanActivate {
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
        if (UserUtils.isAdmin(payload['roles'])) return true;

        const id = request.params._id || request.params.id;
        if (id) {
            const project = await getMongoRepository(ProjectDto).findOne({ _id: id });
            if (!project) {
                throw new NotFoundException(`Project with _id ${id} does not exist.`);
            }
            if (project.userId === payload['id']) {
                return true;
            }
            // verify assignee
            const permission = await getMongoRepository(PermissionDto)
                .findOne({ assignerId: project.userId, assigneeId: payload['id'], projectId: id, status: CONSTANTS.STATUS.ACCEPTED });
            if (permission && project.isValid) {
                return true;
            }
        }
        const userId = request.query.userId;
        if (userId && userId === payload['id']) {
            return true;
        }

        Logger.warn('User does not have permission to query projects.', 'ProjectQueryGuard');
        return false;
    }
}