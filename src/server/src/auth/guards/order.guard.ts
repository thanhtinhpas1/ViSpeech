import { CanActivate, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'orders/dtos/orders.dto';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { getMongoRepository, Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { UserUtils } from '../../utils/user.util';

@Injectable()
export class OrderGuard implements CanActivate {
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
        const id = request.params['_id'] || request.params['id'];
        if (!id) return true;
        if (UserUtils.isAdmin(payload['roles'])) return true;

        const order = await getMongoRepository(OrderDto).findOne({ _id: id });
        if (order && order.userId === payload['id']) {
            return true;
        }

        Logger.warn('User does not have permission to modify this order.', 'OrderGuard');
        return false;
    }
}

@Injectable()
export class OrderQueryGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(PermissionDto)
        private readonly permissionRepo: Repository<PermissionDto>,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }
        if (UserUtils.isAdmin(payload['roles'])) return true;

        const id = request.params._id || request.params.id;
        if (id) {
            const order = await getMongoRepository(OrderDto).findOne({ _id: id });
            if (!order) {
                throw new NotFoundException(`Order with _id ${id} does not exist.`);
            }
            if (order.userId === payload['id']) {
                return true;
            }
            const permission = await this.permissionRepo.findOne({
                where: {
                    projectId: order.token.projectId,
                    assigneeId: payload['id']
                }
            });
            if (permission) return true;
        }

        const tokenId = request.params.tokenId;
        if (tokenId) {
            const token = await getMongoRepository(TokenDto).findOne({ _id: tokenId });
            if (!token) {
                throw new NotFoundException(`Token with _id ${id} does not exist.`);
            }
            if (token.userId === payload['id']) {
                return true;
            }
            const permission = await this.permissionRepo.findOne({
                where: {
                    projectId: token.projectId,
                    assigneeId: payload['id']
                }
            });
            if (permission) return true;
        }

        const userId = request.query.userId;
        if (userId && userId === payload['id']) {
            return true;
        }

        Logger.warn('User does not have permission to query orders.', 'OrderGuard');
        return false;
    }
}