import { IEvent } from '@nestjs/cqrs';
export declare class OrderWelcomedEvent implements IEvent {
    readonly streamId: string;
    readonly orderId: string;
    constructor(streamId: string, orderId: string);
}
