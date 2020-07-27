import { CanActivate, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'auth/auth.service';
import { Repository } from 'typeorm';
import { RequestDto } from 'requests/dtos/requests.dto';
import { UserUtils } from '../../utils/user.util';

@Injectable()
export class RequestGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(RequestDto)
        private readonly repository: Repository<RequestDto>,
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
            const request = await this.repository.findOne({ _id: id });
            if (request && [request.userId, request.assigneeId].includes(payload['id'])) {
                return true;
            }
        }
        const userId = request.params.userId;
        if (userId && userId === payload['id']) {
            return true;
        }
        const projectId = request.params.projectId;
        if (projectId) {
            const request = await this.repository.findOne({ projectId });
            if (request.userId === payload['id']) {
                return true;
            }
        }

        Logger.warn('User does not have permission to query requests.', 'RequestGuard');
        return false;
    }
}