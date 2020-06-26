import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import FacebookTokenStrategy from 'passport-facebook-token';
import { config } from '../../config';
import { AuthService } from './auth.service';
import { USER_TYPE, UserDto } from 'users/dtos/users.dto';
import { RoleDto } from 'roles/dtos/roles.dto';
import { CONSTANTS } from 'common/constant';

@Injectable()
export class FacebookStrategy extends PassportStrategy(FacebookTokenStrategy) {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: config.FACEBOOK.clientId,
            clientSecret: config.FACEBOOK.clientSecret,
        });
    }

    async validate(accessToken: any, refreshToken: any, profile: any) {
        const { id, name, emails } = profile
        const userDto = new UserDto(name.givenName, name.familyName, id, '', emails[0].value, [new RoleDto(CONSTANTS.ROLE.USER)], USER_TYPE.FACEBOOK, id);
        return await this.authService.validateUserSocialId(id, userDto);
    }
}