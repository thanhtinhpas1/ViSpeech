import { CanActivate, Injectable, Logger, BadRequestException } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { CONSTANTS } from 'common/constant';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { getMongoRepository } from 'typeorm';

@Injectable()
export class ProjectGuard implements CanActivate {
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
            throw new BadRequestException();
        }
        if (payload['roles'].includes(CONSTANTS.ROLE.ADMIN)) return true;

        const project = await getMongoRepository(ProjectDto).findOne({_id: id});
        if (project.userId === payload['id']) {
            return true;
        }

        Logger.warn('User do not have permission to modify this project.', 'ProjectGuard');
        return false;
    }
}

@Injectable()
export class ProjectQueryGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new BadRequestException();
        }
        if (payload['roles'] && payload['roles'].includes(CONSTANTS.ROLE.ADMIN)) return true;

        const id = request.params._id || request.params.id;
        if (id) {
            const project = await getMongoRepository(ProjectDto).findOne({ _id: id });
            if (project.userId === payload['id']) {
                return true;
            }
        }

        const userId = request.query.userId;
        if (userId && userId === payload['id']) {
            return true;
        }

        Logger.warn('User do not have permission to query projects.', 'ProjectGuard');
        return false;
    }
}