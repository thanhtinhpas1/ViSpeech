import {IEvent} from '@nestjs/cqrs';

export class AssignedRoleEvent implements IEvent {
    constructor(
        public readonly userId: string,
        public readonly roles: string[],
    ) {
    }
}