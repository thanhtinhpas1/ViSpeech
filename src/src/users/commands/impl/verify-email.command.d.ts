import { ICommand } from '@nestjs/cqrs';
export declare class VerifyEmailCommand implements ICommand {
    readonly streamId: string;
    readonly emailToken: string;
    constructor(streamId: string, emailToken: string);
}
