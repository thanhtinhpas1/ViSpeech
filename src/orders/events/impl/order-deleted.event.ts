import {IEvent} from '@nestjs/cqrs';

export class OrderDeletedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderId: string) {
    }
}
