import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDto} from '../../dtos/users.dto';
import {Repository} from 'typeorm';
import {RoleDto} from '../../../roles/dtos/roles.dto';
import {UserRoleAssignedEvent} from "../impl/user-role-assigned.event";

@EventsHandler(UserRoleAssignedEvent)
export class AssignedRoleHandler implements IEventHandler<UserRoleAssignedEvent> {
    constructor(
        @InjectRepository(UserDto)
        private readonly userRepository: Repository<UserDto>,
    ) {
    }

    handle(event: UserRoleAssignedEvent) {
        try {
            const userId = event.userId;
            const roleName = event.roleName;
            const assignerId = event.assignerId;
            const rolesDto = [new RoleDto(roleName)];
            Logger.log(event.userId, 'AssignedRoleEvent');
            return this.userRepository.update({_id: userId},
                {roles: rolesDto, assignerId});
        } catch (e) {
            Logger.error(e, e.message, 'AssignedRoleEvent');
        }
    }

}