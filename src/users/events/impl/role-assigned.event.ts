import { IEvent } from '@nestjs/cqrs';

export class AssignedRoleEvent implements IEvent {
    constructor(
        public readonly transactionId: string,
        public readonly roles: string[],
        public readonly assignerId: string,
    ) {
    }
}