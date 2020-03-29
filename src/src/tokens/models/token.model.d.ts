import { AggregateRoot } from '@nestjs/cqrs';
export declare class Token extends AggregateRoot {
    private readonly id;
    [x: string]: any;
    constructor(id: string | undefined);
    setData(data: any): void;
    createToken(streamId: string): void;
    createFreeToken(streamId: string): void;
    createOrderedToken(streamId: string): void;
    updateToken(streamId: string): void;
    welcomeToken(streamId: string): void;
    deleteToken(streamId: string): void;
    deleteTokenByUserId(streamId: string): void;
}
