import { IEvent } from '@nestjs/cqrs';
export declare class UserWelcomedEvent implements IEvent {
    readonly streamId: string;
    readonly userId: string;
    constructor(streamId: string, userId: string);
}
