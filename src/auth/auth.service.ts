import {Injectable} from '@nestjs/common';
import {QueryBus} from '@nestjs/cqrs';
import {JwtService} from '@nestjs/jwt';
import {UserDto} from 'users/dtos/users.dto';
import {Utils} from 'utils';
import {FindUserByUsernameQuery, FindUserQuery} from '../users/queries/impl/find-user.query';
import {CONSTANTS} from 'common/constant';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly queryBus: QueryBus
    ) {
    }

    /**
     * Function validate with local strategy
     */
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.findUserByUsername(username);
        if (user && Utils.comparePassword(user.password, pass)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async validateUserId(userId: string) {
        const user = await this.queryBus.execute(new FindUserQuery(userId));
        return user || null;
    }

    generateToken(userId, username, roles) {
        const payload = {username, id: userId, roles};
        return this.jwtService.sign(payload);
    }

    generateTokenWithUserId(userId) {
        const payload = {id: userId};
        return this.jwtService.sign(payload);
    }

    async findUserByUsername(username: string): Promise<UserDto> {
        return await this.queryBus.execute(new FindUserByUsernameQuery(username));
    }

    decode(request: any) {
        const authorization = request.headers.authorization;
        if (!authorization) return false;
        const jwt = authorization.replace(CONSTANTS.BEARER_HEADER_AUTHORIZE, "");
        return this.jwtService.decode(jwt);
    }
}
