import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Utils} from 'utils';
import {UserDto} from 'users/dtos/users.dto';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {QueryBus} from '@nestjs/cqrs';
import {FindUserByUsernameQuery, FindUserQuery} from '../users/queries/impl/find-user.query';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(UserDto)
        private readonly repository: Repository<UserDto>,
        private readonly queryBus: QueryBus,
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

    generate_token(userId, username) {
        const payload = {username, id: userId};
        return this.jwtService.sign(payload);
    }

    generate_token_with_userId(userId) {
        const payload = {id: userId};
        return this.jwtService.sign(payload);
    }

    async findUserByUsername(username: string): Promise<UserDto> {
        return await this.queryBus.execute(new FindUserByUsernameQuery(username));
    }

}
