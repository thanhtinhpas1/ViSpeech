import { ICommand } from '@nestjs/cqrs';
export declare class WelcomePermissionCommand implements ICommand {
    readonly streamId: string;
    readonly permissionId: string;
    constructor(streamId: string, permissionId: string);
}
