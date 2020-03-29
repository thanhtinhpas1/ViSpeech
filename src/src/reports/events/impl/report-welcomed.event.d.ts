import { IEvent } from '@nestjs/cqrs';
export declare class ReportWelcomedEvent implements IEvent {
    readonly streamId: string;
    readonly reportId: string;
    constructor(streamId: string, reportId: string);
}
