import { ICommand } from '@nestjs/cqrs';
import { PermissionResponseDto } from 'permissions/dtos/permissions.dto';

export class ReplyPermissionAssignCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly permissionResponseDto: PermissionResponseDto
    ) {
    }
}
