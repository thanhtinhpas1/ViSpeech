import {IEvent} from '@nestjs/cqrs';

export class PermissionDeletedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionId: string
    ) {
    }
}