import { AggregateRoot } from '@nestjs/cqrs';
export declare class Order extends AggregateRoot {
    private readonly id;
    [x: string]: any;
    constructor(id: string | undefined);
    setData(data: any): void;
    createOrderStart(streamId: string): void;
    createOrder(streamId: string): void;
    updateOrder(streamId: string): void;
    welcomeOrder(streamId: string): void;
    deleteOrder(streamId: string): void;
}
