import { ICommand } from '@nestjs/cqrs';
export declare class WelcomeUserCommand implements ICommand {
    readonly streamId: string;
    readonly userId: string;
    constructor(streamId: string, userId: string);
}
