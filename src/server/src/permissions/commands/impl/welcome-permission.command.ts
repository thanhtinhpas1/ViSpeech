import { ICommand } from '@nestjs/cqrs';

export class WelcomePermissionCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly permissionId: string) {
    }
}
