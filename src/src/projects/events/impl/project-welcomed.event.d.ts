import { IEvent } from '@nestjs/cqrs';
export declare class ProjectWelcomedEvent implements IEvent {
    readonly streamId: string;
    readonly projectId: string;
    constructor(streamId: string, projectId: string);
}
