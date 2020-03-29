import { IEvent } from '@nestjs/cqrs';
export declare class EmailVerifiedEvent implements IEvent {
    readonly streamId: string;
    readonly emailToken: string;
    constructor(streamId: string, emailToken: string);
}
