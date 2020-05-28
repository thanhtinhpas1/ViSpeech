import { CanActivate, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDto } from "orders/dtos/orders.dto";
import { Repository } from "typeorm";
import { Utils } from "utils";
import { CONSTANTS } from "../../common/constant";

@Injectable()
export class AsrServiceGuard implements CanActivate {
    constructor(
        @InjectRepository(OrderDto)
        private readonly orderRepo: Repository<OrderDto>,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
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
