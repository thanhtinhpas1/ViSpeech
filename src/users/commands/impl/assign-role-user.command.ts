import {ICommand} from '@nestjs/cqrs';

export class AssignRoleUserCommand implements ICommand {
    constructor(
        private readonly userId: string,
        private readonly roleName: string[],
        private readonly assignerId: string,
    ) {
    }
}