import { IEvent } from '@nestjs/cqrs';
export declare class PasswordChangedEvent implements IEvent {
    readonly streamId: string;
    readonly userId: string;
    readonly newPassword: string;
    readonly oldPassword: string;
    constructor(streamId: string, userId: string, newPassword: string, oldPassword: string);
}
export declare class PasswordChangedSuccessEvent implements IEvent {
    readonly streamId: string;
    readonly userId: string;
    readonly newPassword: string;
    readonly oldPassword: string;
    constructor(streamId: string, userId: string, newPassword: string, oldPassword: string);
}
export declare class PasswordChangedFailedEvent implements IEvent {
    readonly streamId: string;
    readonly userId: string;
    readonly newPassword: string;
    readonly oldPassword: string;
    readonly error: object;
    constructor(streamId: string, userId: string, newPassword: string, oldPassword: string, error: object);
}
