import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
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
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({username});
        if (user && Utils.comparePassword(password, user.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async validateUserId(userId: string) {
        let user = await this.userRepository.findOne({_id: userId});
        user = user && Utils.removePropertyFromObject(user, 'password');
        return user || null;
    }

    generateToken(userId, username, roles) {
        const payload = {username, id: userId, roles, iat: Date.now()};
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

    decode(request: any) {
        const jwt = Utils.extractToken(request);
        return this.jwtService.decode(jwt);
    }
}
