import {IEvent} from '@nestjs/cqrs';

export class OrderWelcomedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly orderId: string) {
    }
}
