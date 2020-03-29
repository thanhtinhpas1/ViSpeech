import { ICommand } from '@nestjs/cqrs';
export declare class WelcomeReportCommand implements ICommand {
    readonly streamId: string;
    readonly reportId: string;
    constructor(streamId: string, reportId: string);
}
