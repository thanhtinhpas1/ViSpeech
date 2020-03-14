import {IEvent} from "@nestjs/cqrs";

export class UserRoleAssignedEvent implements IEvent {
    constructor(
        public readonly userId: string,
        public readonly roleName: string,
        public readonly assignerId: string
    ) {
    }
}
