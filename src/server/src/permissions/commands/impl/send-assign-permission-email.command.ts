import {ICommand} from '@nestjs/cqrs';
import {PermissionAssignDto} from '../../dtos/permissions.dto';

export class SendAssignPermissionEmailCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly permissionAssignDto: PermissionAssignDto
    ) {
    }
}
