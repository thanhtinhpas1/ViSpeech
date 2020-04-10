import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { RoleDto } from 'roles/dtos/roles.dto';
import { Repository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { config } from '../../../../config';
import { EmailVerifiedEvent } from '../impl/email-verified.event';

@EventsHandler(EmailVerifiedEvent)
export class EmailVerifiedHandler implements IEventHandler<EmailVerifiedEvent> {
    constructor(
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>,
        private readonly jwtService: JwtService,
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
    }

    async handle(event: EmailVerifiedEvent) {
        Logger.log(event.streamId, 'EmailVerifiedEvent');
        const { streamId, emailToken } = event;

        try {
            const decodedToken = this.jwtService.decode(emailToken);
            console.log(decodedToken)
            const userId = decodedToken['id'];
            const user = await this.repository.findOne({ _id: userId });
            if (!user) {
                throw new NotFoundException(`User with _id ${userId} does not exist.`);
            }
            const userRoles = user.roles.filter(role => role.name !== CONSTANTS.ROLE.USER);
            const managerUserRole = new RoleDto(CONSTANTS.ROLE.MANAGER_USER);
            await this.repository.update({ _id: userId }, { roles: [...userRoles, managerUserRole] });
            // TODO generate new token for user
        } catch (error) {
            Logger.error(error.message, '', 'EmailVerifiedEvent');
        }
    }
}
