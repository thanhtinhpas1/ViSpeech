import {
    BadRequestException,
    CanActivate,
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { CONSTANTS } from 'common/constant';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { getMongoRepository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserUtils } from '../../utils/user.util';
import { Utils } from 'utils';

@Injectable()
export class PermissionGuard implements CanActivate {
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

        const permission = await getMongoRepository(PermissionDto).findOne({ _id: id });
        if (permission && permission.assignerId === payload['id']) {
            return true;
        }
        Logger.warn('User does not have permission to modify this permission.', 'PermissionGuard');
        return false;
    }
}

@Injectable()
export class UpdatePermissionExpirationDateGuard implements CanActivate {
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

        const { assigneePermission, expiresIn } = request.body;
        const isAdmin = UserUtils.isAdmin(payload['roles']);
        const isManagerUser = UserUtils.isManagerUser(payload['roles']);
        const isValidExpirationDate = Utils.validExpirationDate(expiresIn);
        return isValidExpirationDate && (isAdmin || (isManagerUser && assigneePermission.assignerId === payload['id']));
    }
}

@Injectable()
export class DeletePermissionForAssigneeGuard implements CanActivate {
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

        const { assignerId } = request.body;
        const isAdmin = UserUtils.isAdmin(payload['roles']);
        const isManagerUser = UserUtils.isManagerUser(payload['roles']);
        return isAdmin || (isManagerUser && assignerId === payload['id']);
    }
}

@Injectable()
export class AssignPermissionGuard implements CanActivate {
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

        const { assignerId, expiresIn } = request.body;
        const isAdmin = UserUtils.isAdmin(payload['roles']);
        const isManagerUser = UserUtils.isManagerUser(payload['roles']);
        const isValidExpirationDate = Utils.validExpirationDate(expiresIn);
        return isValidExpirationDate && (isAdmin || (isManagerUser && assignerId === payload['id']));
    }
}

@Injectable()
export class ReplyPermissionAssignGuard implements CanActivate {
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
        const assignerId = decodedEmailToken['assignerId'];
        const assigneeId = decodedEmailToken['assigneeId'];
        const projectId = decodedEmailToken['projectId'];
        const exp = decodedEmailToken['exp'];
        if (!decodedEmailToken || !assignerId || !assigneeId || !projectId || !exp) {
            throw new BadRequestException('Token is invalid.');
        }
        if (Utils.tokenExpired(`${exp}000`)) {
            throw new BadRequestException('Token is expired.');
        }

        const permission = await getMongoRepository(PermissionDto).findOne({
            assignerId,
            assigneeId,
            projectId,
            status: CONSTANTS.STATUS.PENDING
        });
        return permission && assigneeId === requestJwt['id'];
    }
}

@Injectable()
export class PermissionQueryGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {
    }

    async canActivate(context: import ('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }
        if (UserUtils.isAdmin(payload['roles'])) return true;

        const { id, emailToken } = request.params;
        if (id) {
            const permission = await getMongoRepository(PermissionDto).findOne({ _id: id });
            if (!permission) {
                throw new NotFoundException(`Permission with _id ${id} does not exist.`);
            }
            if (permission.assigneeId === payload['id'] || permission.assignerId === payload['id']) {
                return true;
            }
        }

        if (emailToken) {
            const decodedToken = this.jwtService.decode(emailToken);
            const assigneeId = decodedToken['assigneeId'];
            const assignerId = decodedToken['assignerId'];
            const projectId = decodedToken['projectId'];
            if (assigneeId && assignerId && projectId) {
                const permissions = await getMongoRepository(PermissionDto).find({ assigneeId, assignerId, projectId });
                if (permissions.length === 0) {
                    throw new NotFoundException(`Permissions with projectId: ${projectId}, assignerId: ${assignerId}, assigneeId: ${assigneeId} does not exist.`);
                }
                if (assigneeId === payload['id'] || assignerId === payload['id']) {
                    return true;
                }
            }
        }

        const { assigneeId, assignerId } = request.query;
        if (assigneeId === payload['id'] || assignerId === payload['id']) {
            return true;
        }

        Logger.warn('User does not have permission to query permissions.', 'PermissionQueryGuard');
        return false;
    }
}