import { ICommand } from '@nestjs/cqrs';
import { AssigneePermissionDto } from '../../dtos/permissions.dto';

export class UpdatePermissionExpirationDateCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly assigneePermissionDto: AssigneePermissionDto,
        public readonly expiresIn: number
    ) {
    }
}
