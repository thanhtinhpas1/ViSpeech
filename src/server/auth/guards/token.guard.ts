import { CanActivate, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { CONSTANTS } from 'common/constant';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { getMongoRepository } from 'typeorm';
import { PermissionDto } from 'permissions/dtos/permissions.dto';

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const id = request.params._id || request.params.id || request.params.tokenId;
        if (!id) return true;

        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }
        
        const isAdmin = payload['roles'].findIndex(role => role.name === CONSTANTS.ROLE.ADMIN) !== -1;
        if (isAdmin) return true;

        const token = await getMongoRepository(TokenDto).findOne({ _id: id });
        if (!token) {
            throw new NotFoundException(`Token with _id ${id} does not exist.`);
        }
        if (token.userId === payload['id']) {
            return true;
        }

        Logger.warn('User does not have permission to modify this token.', 'TokenGuard');
        return false;
    }
}

@Injectable()
export class TokenQueryGuard implements CanActivate {
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
        
        const isAdmin = payload['roles'].findIndex(role => role.name === CONSTANTS.ROLE.ADMIN) !== -1;
        if (isAdmin) return true;

        const id = request.params._id || request.params.id;
        if (id) {
            const token = await getMongoRepository(TokenDto).findOne({ _id: id });
            if (!token) {
                throw new NotFoundException(`Token with _id ${id} does not exist.`);
            }
            if (token.userId === payload['id']) {
                return true;
            }
            const permission = await getMongoRepository(PermissionDto)
                .findOne({ assigneeId: payload['id'], projectId: token.projectId, status: CONSTANTS.STATUS.ACCEPTED });
            if (permission) {
                return true;
            }
        }

        if (request.params['userId'] && request.params['userId'] === payload['id']) {
            return true;
        }

        const { userId, projectId } = request.query;
        if (userId && userId === payload['id']) {
            return true;
        }

        // verify assignee
        if (userId && projectId) {
            const permission = await getMongoRepository(PermissionDto)
                .findOne({ assigneeId: payload['id'], assignerId: userId, projectId, status: CONSTANTS.STATUS.ACCEPTED });
            if (permission) {
                return true;
            }
        }

        Logger.warn('User does not have permission to query tokens.', 'TokenQueryGuard');
        return false;
    }
}