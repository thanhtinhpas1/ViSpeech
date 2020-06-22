import { CanActivate, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDto } from "orders/dtos/orders.dto";
import { Repository, getMongoRepository } from "typeorm";
import { Utils } from "utils";
import { CONSTANTS } from "../../common/constant";
import { AuthService } from "../auth.service";
import { UserDto } from "users/dtos/users.dto";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { TokenTypeDto } from "tokens/dtos/token-types.dto";

@Injectable()
export class AsrServiceGuard implements CanActivate {
    constructor(
        @InjectRepository(OrderDto)
        private readonly orderRepo: Repository<OrderDto>,
        @InjectRepository(TokenDto)
        private readonly tokenRepo: Repository<TokenDto>,
        @InjectRepository(TokenTypeDto)
        private readonly tokenTypeRepo: Repository<TokenTypeDto>,
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
        if (!order) {
            const tokenTypeDto = await this.tokenTypeRepo.findOne({ name: CONSTANTS.TOKEN_TYPE.FREE });
            const tokenDto = await this.tokenRepo.findOne({ value: token });
            if (tokenDto && tokenDto.tokenTypeId === tokenTypeDto._id) return true;
        }
        Logger.warn('User does not have permission to call AsrService.', 'AsrServiceGuard');
        return false;
    }
}
