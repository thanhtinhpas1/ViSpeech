import { CanActivate, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'auth/auth.service';
import { CONSTANTS } from 'common/constant';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RequestGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(TokenDto)
        private readonly tokenRepository: Repository<TokenDto>,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const id = request.params._id || request.params.id;
        if (!id) return true;

        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }
        if (payload['roles'].includes(CONSTANTS.ROLE.ADMIN)) return true;

        // const projectId = request.params.projectId;
        // if (!projectId) return true;
        // const tokenDto = await this.tokenRepository.findOne({_id: id});
        // if (!tokenDto) return false;
        // TODO: verify token have permisson on this project (user => project)

        Logger.warn('User do not have permission.', 'RequestGuard');
        return false;
    }
}