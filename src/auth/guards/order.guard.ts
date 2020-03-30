import { CanActivate, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { getMongoRepository } from "typeorm";
import { CONSTANTS } from "../../common/constant";
import { AuthService } from "../auth.service";
import { OrderDto } from "orders/dtos/orders.dto";

@Injectable()
export class OrderGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    canActivate(context: import('@nestjs/common').ExecutionContext): boolean | Promise<boolean> | import('rxjs').Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const id = request.params['_id'] || request.params['id'];
        if (!id) return true;

        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }

        const isAdmin = payload['roles'].findIndex(role => role.name === CONSTANTS.ROLE.ADMIN) !== -1;
        if (isAdmin) return true;

        const order = getMongoRepository(OrderDto).findOne({_id: id});
        if (!order) {
            throw new NotFoundException(`Order with _id ${id} does not exist.`);
        }
        if (order['userId'] === payload['id']) {
            return true;
        }

        Logger.warn('User do not have permission to modify this order.', 'OrderGuard');
        return false;
    }
}