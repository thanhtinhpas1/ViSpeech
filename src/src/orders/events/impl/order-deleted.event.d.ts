import { IEvent } from '@nestjs/cqrs';
export declare class OrderDeletedEvent implements IEvent {
    readonly streamId: string;
    readonly orderId: string;
    constructor(streamId: string, orderId: string);
}
