import { ICommand } from '@nestjs/cqrs';
import { PermissionIdRequestParamsDto } from '../../dtos/permissions.dto';
export declare class DeletePermissionCommand implements ICommand {
    readonly streamId: string;
    readonly permissionIdDto: PermissionIdRequestParamsDto;
    constructor(streamId: string, permissionIdDto: PermissionIdRequestParamsDto);
}
