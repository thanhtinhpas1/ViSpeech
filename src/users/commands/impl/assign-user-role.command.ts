import { ICommand } from '@nestjs/cqrs';

export class AssignUserRoleCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly roleName: string,
        public readonly assignerId: string,
    ) {
    }
}