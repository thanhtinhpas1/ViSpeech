import { Permission } from '../models/permission.model';
import { PermissionAssignDto, PermissionDto, PermissionResponseDto } from 'permissions/dtos/permissions.dto';
export declare class PermissionRepository {
    createPermission(streamId: string, permissionDto: PermissionDto): Promise<Permission>;
    updatePermission(streamId: string, permissionDto: PermissionDto): Promise<Permission>;
    deletePermission(streamId: string, permissionId: string): Promise<Permission>;
    welcomePermission(streamId: string, permissionId: string): Promise<Permission>;
    sendAssignPermissionEmail(streamId: string, permissionAssignDto: PermissionAssignDto): Promise<Permission>;
    replyPermissionAssign(streamId: string, permissionResponseDto: PermissionResponseDto): Promise<Permission>;
}
