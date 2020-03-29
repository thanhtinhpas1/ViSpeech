import { IEvent } from '@nestjs/cqrs';
export declare class TokenDeletedEvent implements IEvent {
    readonly streamId: string;
    readonly tokenId: string;
    constructor(streamId: string, tokenId: string);
}
export declare class TokenDeletedByUserIdEvent implements IEvent {
    readonly streamId: string;
    readonly userId: string;
    constructor(streamId: string, userId: string);
}
