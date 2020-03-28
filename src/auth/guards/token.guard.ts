import { CanActivate, Injectable, Logger, BadRequestException } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { CONSTANTS } from 'common/constant';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { getMongoRepository } from 'typeorm';

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
            throw new BadRequestException();
        }
        if (payload['roles'].includes(CONSTANTS.ROLE.ADMIN)) return true;

        const token = await getMongoRepository(TokenDto).findOne({_id: id});
        if (token.userId === payload['id']) {
            return true;
        }

        Logger.warn('User do not have permission to modify this token.', 'TokenGuard');
        return false;
    }
}