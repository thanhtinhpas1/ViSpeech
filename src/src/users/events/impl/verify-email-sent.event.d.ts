import { IEvent } from '@nestjs/cqrs';
export declare class VerifyEmailSentEvent implements IEvent {
    readonly streamId: string;
    readonly userId: string;
    constructor(streamId: string, userId: string);
}
export declare class VerifyEmailSentSuccessEvent implements IEvent {
    readonly streamId: string;
    readonly userId: string;
    constructor(streamId: string, userId: string);
}
export declare class VerifyEmailSentFailedEvent implements IEvent {
    readonly streamId: string;
    readonly userId: string;
    readonly error: object;
    constructor(streamId: string, userId: string, error: object);
}
