import {ICommand} from '@nestjs/cqrs';

export class AssignRoleUserCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly roleName: string,
        public readonly assignerId: string,
    ) {
    }
}