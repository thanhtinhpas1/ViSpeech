import { ICommand } from '@nestjs/cqrs';
export declare class WelcomeOrderCommand implements ICommand {
    readonly streamId: string;
    readonly orderId: string;
    constructor(streamId: string, orderId: string);
}
