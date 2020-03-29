import { ICommand } from '@nestjs/cqrs';
export declare class WelcomeProjectCommand implements ICommand {
    readonly streamId: string;
    readonly projectId: string;
    constructor(streamId: string, projectId: string);
}
