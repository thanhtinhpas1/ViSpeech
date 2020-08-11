import { IEvent } from '@nestjs/cqrs';
import { UpdatePermissionAssigneeTokensDto } from 'permissions/dtos/permissions.dto';

export class PermissionAssigneeTokensUpdatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly updatePermissionAssigneeTokensDto: UpdatePermissionAssigneeTokensDto,
    ) {
    }
}

export class PermissionAssigneeTokensUpdatedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly updatePermissionAssigneeTokensDto: UpdatePermissionAssigneeTokensDto,
    ) {
    }
}

export class PermissionAssigneeTokensUpdatedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly updatePermissionAssigneeTokensDto: UpdatePermissionAssigneeTokensDto,
        public readonly error: object,
    ) {
    }
}
