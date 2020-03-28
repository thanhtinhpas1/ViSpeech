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

    generateTokenWithUserId(userId, expiresIn = null) {
        const payload = {id: userId};
        if (expiresIn) {
            return this.jwtService.sign(payload, {expiresIn});
        }
        return this.jwtService.sign(payload);
    }

    generateEmailToken(assignerId, projectId, assigneeId, permissions) {
        const payload = {assignerId, projectId, assigneeId, permissions};
        return this.jwtService.sign(payload, {expiresIn: '2 days'});
    }

    async findUserByUsername(username: string): Promise<UserDto> {
        return await this.queryBus.execute(new FindUserByUsernameQuery(username));
    }

    decodeJwtToken(jwt) {
        return this.jwtService.decode(jwt);
    }

    decode(request: any) {
        const authorization = request.headers.authorization;
        if (!authorization) return null;
        const jwt = authorization.replace(CONSTANTS.BEARER_HEADER_AUTHORIZE, '');
        return this.decodeJwtToken(jwt);
    }
}
