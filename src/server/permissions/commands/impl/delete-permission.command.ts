import {ICommand} from '@nestjs/cqrs';
import {PermissionIdRequestParamsDto} from '../../dtos/permissions.dto';

export class DeletePermissionCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly permissionIdDto: PermissionIdRequestParamsDto
    ) {
    }
}
