import { IEvent } from '@nestjs/cqrs';
import { OrderDto } from 'orders/dtos/orders.dto';
export declare class OrderCreationStartedEvent implements IEvent {
    readonly streamId: string;
    readonly orderDto: OrderDto;
    constructor(streamId: string, orderDto: OrderDto);
}
export declare class OrderCreatedEvent implements IEvent {
    readonly streamId: string;
    readonly orderDto: OrderDto;
    constructor(streamId: string, orderDto: OrderDto);
}
export declare class OrderCreatedSuccessEvent implements IEvent {
    readonly streamId: string;
    readonly orderDto: any;
    constructor(streamId: string, orderDto: any);
}
export declare class OrderCreatedFailedEvent implements IEvent {
    readonly streamId: string;
    readonly orderDto: OrderDto;
    readonly error: object;
    constructor(streamId: string, orderDto: OrderDto, error: object);
}
