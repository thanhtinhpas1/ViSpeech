import { IEvent } from '@nestjs/cqrs';
export declare class UserDeletedEvent implements IEvent {
    readonly streamId: string;
    readonly userId: string;
    constructor(streamId: string, userId: string);
}
export declare class UserDeletedSuccessEvent implements IEvent {
    readonly streamId: string;
    readonly userId: string;
    constructor(streamId: string, userId: string);
}
export declare class UserDeletedFailedEvent implements IEvent {
    readonly streamId: string;
    readonly userId: string;
    readonly error: object;
    constructor(streamId: string, userId: string, error: object);
}
