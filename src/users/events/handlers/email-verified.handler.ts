import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDto} from 'users/dtos/users.dto';
import {Repository} from 'typeorm';
import {EmailVerifiedEvent} from '../impl/email-verified.event';
import {CONSTANTS} from 'common/constant';
import {RoleDto} from 'roles/dtos/roles.dto';
import {AuthService} from 'auth/auth.service';

@EventsHandler(EmailVerifiedEvent)
export class EmailVerifiedHandler implements IEventHandler<EmailVerifiedEvent> {
    constructor(
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>,
        private readonly authService: AuthService,
    ) {
    }

    async handle(event: EmailVerifiedEvent) {
        Logger.log(event.streamId, 'EmailVerifiedEvent');
        const {streamId, emailToken} = event;

        try {
            const decodedToken = this.authService.decodeJwtToken(emailToken);
            const userId = decodedToken['id'];
            const user = await this.repository.findOne({_id: userId});
            if (!user) {
                throw new NotFoundException(`User with _id ${userId} does not exist.`);
            }
            const userRoles = user.roles.filter(role => role.name !== CONSTANTS.ROLE.USER);
            const managerUserRole = new RoleDto(CONSTANTS.ROLE.MANAGER_USER);
            await this.repository.update({_id: userId}, {roles: [...userRoles, managerUserRole]});
        } catch (error) {
            Logger.error(error.message, '', 'EmailVerifiedEvent');
        }
    }
}
