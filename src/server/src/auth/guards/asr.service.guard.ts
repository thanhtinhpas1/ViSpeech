import { CanActivate, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDto } from "orders/dtos/orders.dto";
import { Repository, getMongoRepository } from "typeorm";
import { Utils } from "utils";
import { CONSTANTS } from "../../common/constant";
import { AuthService } from "../auth.service";
import { UserDto } from "users/dtos/users.dto";

@Injectable()
export class AsrServiceGuard implements CanActivate {
    constructor(
        @InjectRepository(OrderDto)
        private readonly orderRepo: Repository<OrderDto>,
        private readonly authService: AuthService,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const payload = this.authService.decode(request);

        const user = await getMongoRepository(UserDto).findOne({ _id: payload['id'] });
        const isAdmin = user.roles.findIndex(role => role.name === CONSTANTS.ROLE.ADMIN) !== -1;
        if (isAdmin) return true;

        const token = Utils.extractToken(request);
        const order = await this.orderRepo.findOne({
            where: {
                "token.value": token
            }
        })
        if (order && CONSTANTS.STATUS.SUCCESS === order.status) return true;
        Logger.warn('User does not have permission to call AsrService.', 'AsrServiceGuard');
        return false;
    }
}
