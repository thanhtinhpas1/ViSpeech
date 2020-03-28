import {Injectable} from '@nestjs/common';
import {Permission} from '../models/permission.model';
import {PermissionAssignDto, PermissionDto, PermissionResponseDto} from 'permissions/dtos/permissions.dto';

@Injectable()
export class PermissionRepository {
    async createPermission(streamId: string, permissionDto: PermissionDto) {
        const permission = new Permission(undefined);
        permission.setData(permissionDto);
        permission.createPermission(streamId);
        return permission;
    }

    async updatePermission(streamId: string, permissionDto: PermissionDto) {
        const permission = new Permission(undefined);
        permission.setData(permissionDto);
        permission.updatePermission(streamId);
        return permission;
    }

    async deletePermission(streamId: string, permissionId: string) {
        const permission = new Permission(permissionId);
        permission.deletePermission(streamId);
        return permission;
    }

    async welcomePermission(streamId: string, permissionId: string) {
        const permission = new Permission(permissionId);
        permission.welcomePermission(streamId);
        return permission;
    }

    async sendAssignPermissionEmail(streamId: string, permissionAssignDto: PermissionAssignDto) {
        const permission = new Permission(undefined);
        permission.setData(permissionAssignDto);
        permission.sendAssignPermissionEmail(streamId);
        return permission;
    }

    async replyPermissionAssign(streamId: string, permissionResponseDto: PermissionResponseDto) {
        const permission = new Permission(undefined);
        permission.setData(permissionResponseDto);
        permission.replyPermissionAssign(streamId);
        return permission;
    }
}
