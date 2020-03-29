import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { Repository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { Utils } from 'utils';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(UserDto)
        private readonly userRepository: Repository<UserDto>,
    ) {
    }

    /**
     * Function validate with local strategy
     */
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.findUserByUsername(username);
        if (user && Utils.comparePassword(user.password, pass)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async validateUserId(userId: string) {
        const user = await this.userRepository.findOne({ _id: userId });
        return user || null;
    }

    generateToken(userId, username, roles) {
        const payload = { username, id: userId, roles };
        return this.jwtService.sign(payload);
    }

    generateTokenWithUserId(userId, expiresIn = null) {
        const payload = { id: userId };
        if (expiresIn) {
            return this.jwtService.sign(payload, { expiresIn });
        }
        return this.jwtService.sign(payload);
    }

    generateEmailToken(assignerId, projectId, assigneeId, permissions) {
        const payload = { assignerId, projectId, assigneeId, permissions };
        return this.jwtService.sign(payload, { expiresIn: '2 days' });
    }

    async findUserByUsername(username: string): Promise<UserDto> {
        return await this.userRepository.findOne({ username });
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
