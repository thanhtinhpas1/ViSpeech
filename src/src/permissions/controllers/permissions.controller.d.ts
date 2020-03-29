import { FindPermissionQuery } from 'permissions/queries/impl/find-permission.query';
import { GetPermissionsQuery } from 'permissions/queries/impl/get-permissions.query';
import { PermissionAssignDto, PermissionDto, PermissionIdRequestParamsDto, PermissionResponseDto } from '../dtos/permissions.dto';
import { PermissionsService } from '../services/permissions.service';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    createPermission(permissionDto: PermissionDto): Promise<PermissionDto>;
    updatePermission(permissionIdDto: PermissionIdRequestParamsDto, permissionDto: PermissionDto): Promise<any>;
    deletePermission(permissionIdDto: PermissionIdRequestParamsDto): Promise<any>;
    sendAssignPermissionEmail(permissionAssignDto: PermissionAssignDto): Promise<any>;
    replyPermisisonAssign(permissionResponseDto: PermissionResponseDto): Promise<any>;
    getPermissions(getPermissionsQuery: GetPermissionsQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    findOnePermission(findPermissionQuery: FindPermissionQuery): Promise<PermissionDto>;
}
