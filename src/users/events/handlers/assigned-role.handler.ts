import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {AssignedRoleEvent} from '../impl/role-assigned.event';
import {Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDto} from '../../dtos/users.dto';
import {Repository} from 'typeorm';
import {RoleDto} from '../../../roles/dtos/roles.dto';

@EventsHandler(AssignedRoleEvent)
export class AssignedRoleHandler implements IEventHandler {
    constructor(
        @InjectRepository(UserDto)
        private readonly userRepository: Repository<UserDto>,
    ) {
    }

    async handle(event: AssignedRoleEvent) {
        try {
            Logger.log(event, 'AssignedRoleEvent');
            const userId = event.userId;
            const roles = event.roles;
            const rolesDto = new Array(roles.length);
            for (const role of roles) {
                const entity = new RoleDto(role);
                rolesDto.push(entity);
            }
            return await this.userRepository.update(userId,
                {roles: rolesDto});
        } catch (e) {
            Logger.error(e, e.message, 'AssignedRoleEvent');
        }
    }

}