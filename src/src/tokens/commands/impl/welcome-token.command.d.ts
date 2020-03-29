import { ICommand } from '@nestjs/cqrs';
export declare class WelcomeTokenCommand implements ICommand {
    readonly streamId: string;
    readonly tokenId: string;
    constructor(streamId: string, tokenId: string);
}
