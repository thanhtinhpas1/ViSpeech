import { Injectable } from '@nestjs/common';
import { Permission } from '../models/permission.model';
import { PermissionAssignDto, PermissionDto, PermissionResponseDto, PermissionId, AssigneePermissionDto } from 'permissions/dtos/permissions.dto';

@Injectable()
export class PermissionRepository {
    async createPermission(streamId: string, permissionDto: PermissionDto) {
        const permission = new Permission(streamId);
        permission.setData(permissionDto);
        permission.createPermission(streamId);
        return permission;
    }

    async updatePermission(streamId: string, permissionDto: PermissionDto) {
        const permission = new Permission(streamId);
        permission.setData(permissionDto);
        permission.updatePermission(streamId);
        return permission;
    }

    async updatePermissionExpirationDate(streamId: string, assigneePermissionDto: AssigneePermissionDto, expiresIn: number) {
        const permission = new Permission(streamId);
        permission.setData(assigneePermissionDto);
        permission.updatePermissionExpirationDate(streamId, expiresIn);
        return permission;
    }

    async deletePermission(streamId: string, permissionId: string) {
        const permission = new Permission(permissionId);
        permission.deletePermission(streamId);
        return permission;
    }

    async deletePermissionByUserId(streamId: string, userId: string) {
        const permission = new Permission(streamId);
        permission.deletePermissionByUserId(streamId, userId);
        return permission;
    }

    async deletePermissionByProjectId(streamId: string, projectId: string) {
        const permission = new Permission(streamId);
        permission.deletePermissionByProjectId(streamId, projectId);
        return permission;
    }

    async deletePermissionForAssignee(streamId: string, assigneePermissionDto: AssigneePermissionDto) {
        const permission = new Permission(streamId);
        permission.setData(assigneePermissionDto);
        permission.deletePermissionForAssignee(streamId);
        return permission;
    }

    async welcomePermission(streamId: string, permissionId: string) {
        const permission = new Permission(permissionId);
        permission.welcomePermission(streamId);
        return permission;
    }

    async sendAssignPermissionEmail(streamId: string, permissionAssignDto: PermissionAssignDto, permissionIds: PermissionId[]) {
        const permission = new Permission(streamId);
        permission.setData(permissionAssignDto);
        permission.sendAssignPermissionEmail(streamId, permissionIds);
        return permission;
    }

    async replyPermissionAssign(streamId: string, permissionResponseDto: PermissionResponseDto) {
        const permission = new Permission(streamId);
        permission.setData(permissionResponseDto);
        permission.replyPermissionAssign(streamId);
        return permission;
    }
}
