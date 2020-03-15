import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../../dtos/users.dto';
import { Repository } from 'typeorm';
import { RoleDto } from '../../../roles/dtos/roles.dto';
import { UserRoleAssignedEvent, UserRoleAssignedSuccessEvent, UserRoleAssignedFailedEvent } from "../impl/user-role-assigned.event";

@EventsHandler(UserRoleAssignedEvent)
export class UserRoleAssignedHandler implements IEventHandler<UserRoleAssignedEvent> {
    constructor(
        private readonly eventBus: EventBus,
        @InjectRepository(UserDto) private readonly userRepository: Repository<UserDto>,
    ) { }

    async handle(event: UserRoleAssignedEvent) {
        Logger.log(event.userId, "UserRoleAssignedEvent");
        const { userId, roleName, assignerId } = event;
        try {
            const roleDto = [new RoleDto(roleName)];
            await this.userRepository.update({ _id: userId }, { roles: roleDto, assignerId });
            this.eventBus.publish(new UserRoleAssignedSuccessEvent(userId, roleName, assignerId));
        } catch (error) {
            this.eventBus.publish(new UserRoleAssignedFailedEvent(userId, roleName, assignerId, error));
        }
    }
}

@EventsHandler(UserRoleAssignedSuccessEvent)
export class UserRoleAssignedSuccessHandler
    implements IEventHandler<UserRoleAssignedSuccessEvent> {
    handle(event: UserRoleAssignedSuccessEvent) {
        Logger.log(event.userId, "UserRoleAssignedSuccessEvent");
    }
}

@EventsHandler(UserRoleAssignedFailedEvent)
export class UserRoleAssignedFailedHandler
    implements IEventHandler<UserRoleAssignedFailedEvent> {
    handle(event: UserRoleAssignedFailedEvent) {
        Logger.log(event.error, "UserRoleAssignedFailedEvent");
    }
}