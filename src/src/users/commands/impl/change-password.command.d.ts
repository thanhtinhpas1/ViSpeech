import { ICommand } from '@nestjs/cqrs';
export declare class ChangePasswordCommand implements ICommand {
    readonly streamId: string;
    readonly userId: string;
    readonly newPassword: string;
    readonly oldPassword: string;
    constructor(streamId: string, userId: string, newPassword: string, oldPassword: string);
}
