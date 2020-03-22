import { IEvent } from "@nestjs/cqrs";

export class UserRoleAssignedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userId: string,
        public readonly roleName: string,
        public readonly assignerId: string
    ) {
    }
}

export class UserRoleAssignedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userId: string,
        public readonly roleName: string,
        public readonly assignerId: string
    ) { }
}

export class UserRoleAssignedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly userId: string,
        public readonly roleName: string,
        public readonly assignerId: string,
        public readonly error: object
    ) { }
}
