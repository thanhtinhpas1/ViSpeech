import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PermissionAssignDto, PermissionDto, PermissionIdRequestParamsDto, PermissionResponseDto } from '../dtos/permissions.dto';
import { GetPermissionsQuery } from 'permissions/queries/impl/get-permissions.query';
import { FindPermissionQuery } from 'permissions/queries/impl/find-permission.query';
export declare class PermissionsService {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    createPermission(streamId: string, permissionDto: PermissionDto): Promise<any>;
    updatePermission(streamId: string, permissionDto: PermissionDto): Promise<any>;
    deletePermission(streamId: string, permissionIdDto: PermissionIdRequestParamsDto): Promise<any>;
    sendAssignPermissionEmail(streamId: string, permissionAssignDto: PermissionAssignDto): Promise<any>;
    replyPermisisonAssign(streamId: string, permissionResponseDto: PermissionResponseDto): Promise<any>;
    getPermissions(getPermissionsQuery: GetPermissionsQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    findOne(findPermissionQuery: FindPermissionQuery): Promise<PermissionDto>;
}
