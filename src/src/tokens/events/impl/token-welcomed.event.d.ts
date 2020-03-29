import { IEvent } from '@nestjs/cqrs';
export declare class TokenWelcomedEvent implements IEvent {
    readonly streamId: string;
    readonly tokenId: string;
    constructor(streamId: string, tokenId: string);
}
