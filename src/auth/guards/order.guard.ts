import { CanActivate, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { getMongoRepository } from "typeorm";
import { CONSTANTS } from "../../common/constant";
import { AuthService } from "../auth.service";
import { OrderDto } from "orders/dtos/orders.dto";
import { TokenDto } from "tokens/dtos/tokens.dto";

@Injectable()
export class OrderGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const id = request.params['_id'] || request.params['id'];
        if (!id) return true;

        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }

        const isAdmin = payload['roles'].findIndex(role => role.name === CONSTANTS.ROLE.ADMIN) !== -1;
        if (isAdmin) return true;

        const order = await getMongoRepository(OrderDto).findOne({_id: id});
        if (!order) {
            throw new NotFoundException(`Order with _id ${id} does not exist.`);
        }
        if (order['userId'] === payload['id']) {
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
            const order = await getMongoRepository(OrderDto).findOne({ _id: id });
            if (!order) {
                throw new NotFoundException(`Order with _id ${id} does not exist.`);
            }
            if (order.userId === payload['id']) {
                return true;
            }
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
        }

        const userId = request.query.userId;
        if (userId && userId === payload['id']) {
            return true;
        }

        Logger.warn('User does not have permission to query orders.', 'OrderGuard');
        return false;
    }
}