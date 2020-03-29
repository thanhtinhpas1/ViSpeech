import { AggregateRoot } from '@nestjs/cqrs';
export declare class Report extends AggregateRoot {
    private readonly id;
    [x: string]: any;
    constructor(id: string | undefined);
    setData(data: any): void;
    createReport(streamId: string): void;
    updateReport(streamId: string): void;
    welcomeReport(streamId: string): void;
    deleteReport(streamId: string): void;
}
