import {IEvent} from '@nestjs/cqrs';
import {PermissionDto} from '../../dtos/permissions.dto';

export class PermissionUpdatedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionDto: PermissionDto) {
    }
}
