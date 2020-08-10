import { ICommand } from '@nestjs/cqrs';
import { AssigneePermissionDto } from 'permissions/dtos/permissions.dto';

export class DeletePermissionForAssigneeCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly assigneePermissionDto: AssigneePermissionDto
    ) {
    }
}
