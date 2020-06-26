import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy }  from 'passport-google-token';
import { config } from '../../config';
import { AuthService } from './auth.service';
import { UserDto, USER_TYPE } from 'users/dtos/users.dto';
import { CONSTANTS } from 'common/constant';
import { RoleDto } from 'roles/dtos/roles.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: config.GOOGLE.clientId,
            clientSecret: config.GOOGLE.clientSecret,
        });
    }

    async validate(accessToken: any, refreshToken: any, profile: any) {
        console.log(`profile ${JSON.stringify(profile)}`)
        const { id, name, emails } = profile
        const userDto = new UserDto(name.givenName, name.familyName, id, '', emails[0].value, [new RoleDto(CONSTANTS.ROLE.USER)], USER_TYPE.GOOGLE, id);
        const user = await this.authService.validateUserSocialId(id, userDto);
        return user;
    }
}