import { ICommand } from '@nestjs/cqrs';
import { PermissionDto } from '../../dtos/permissions.dto';

export class UpdatePermissionCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly permissionDto: PermissionDto) {
    }
}
