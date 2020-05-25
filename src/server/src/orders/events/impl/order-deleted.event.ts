import { IEvent } from '@nestjs/cqrs';

export class OrderDeletedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderId: string) { }
}

export class OrderDeletedSuccessEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderId: string) { }
}

export class OrderDeletedFailedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderId: string,
        public readonly error: object
    ) { }
}
