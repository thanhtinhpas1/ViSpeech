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
            Logger.log(event.transactionId, 'AssignedRoleEvent');
            const userId = event.transactionId;
            const roleName = event.roleName;
            const assignerId = event.assignerId;
            const rolesDto = [new RoleDto(roleName)];
            return await this.userRepository.update({_id: userId},
                {roles: rolesDto, assignerId});
        } catch (e) {
            Logger.error(e, e.message, 'AssignedRoleEvent');
        }
    }

}