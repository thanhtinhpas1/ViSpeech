import { CanActivate, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'orders/dtos/orders.dto';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
import { Utils } from 'utils';

@Injectable()
export class AsrServiceGuard implements CanActivate {
    constructor(
        @InjectRepository(OrderDto)
        private readonly orderRepo: Repository<OrderDto>,
        @InjectRepository(TokenDto)
        private readonly tokenRepo: Repository<TokenDto>,
        @InjectRepository(TokenTypeDto)
        private readonly tokenTypeRepo: Repository<TokenTypeDto>,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = Utils.extractToken(request);

        const tokenDto = await this.tokenRepo.findOne({value: token});
        if (tokenDto) return true;
        Logger.warn('User does not have permission to call AsrService.', 'AsrServiceGuard');
        return false;
    }
}
