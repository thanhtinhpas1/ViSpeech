import { IEvent } from '@nestjs/cqrs';

export class OrderUpdatedStatusEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderId: string,
        public readonly status: string,
    ) {
    }
}