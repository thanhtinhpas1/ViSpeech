import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
    PermissionAssignDto,
    PermissionDto,
    PermissionIdRequestParamsDto,
    PermissionResponseDto
} from '../dtos/permissions.dto';
import { CreatePermissionCommand } from '../commands/impl/create-permission.command';
import { UpdatePermissionCommand } from '../commands/impl/update-permission.command';
import { DeletePermissionCommand } from '../commands/impl/delete-permission.command';
import { GetPermissionsQuery } from 'permissions/queries/impl/get-permissions.query';
import { FindPermissionQuery } from 'permissions/queries/impl/find-permission.query';
import { SendAssignPermissionEmailCommand } from 'permissions/commands/impl/send-assign-permission-email.command';
import { ReplyPermissionAssignCommand } from 'permissions/commands/impl/reply-permission-assign.command';
import { FindPermissionsByIdsQuery } from 'permissions/queries/impl/find-permissions-by-ids.query';

@Injectable()
export class PermissionsService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {
    }

    async createPermission(streamId: string, permissionDto: PermissionDto) {
        return await this.commandBus.execute(new CreatePermissionCommand(streamId, permissionDto));
    }

    async updatePermission(streamId: string, permissionDto: PermissionDto) {
        return await this.commandBus.execute(new UpdatePermissionCommand(streamId, permissionDto));
    }

    async deletePermission(streamId: string, permissionIdDto: PermissionIdRequestParamsDto) {
        return await this.commandBus.execute(new DeletePermissionCommand(streamId, permissionIdDto));
    }

    async sendAssignPermissionEmail(streamId: string, permissionAssignDto: PermissionAssignDto) {
        return await this.commandBus.execute(new SendAssignPermissionEmailCommand(streamId, permissionAssignDto));
    }

    async replyPermissionAssign(streamId: string, permissionResponseDto: PermissionResponseDto) {
        return await this.commandBus.execute(new ReplyPermissionAssignCommand(streamId, permissionResponseDto));
    }

    async getPermissions(getPermissionsQuery: GetPermissionsQuery) {
        const query = new GetPermissionsQuery();
        Object.assign(query, getPermissionsQuery);
        return await this.queryBus.execute(query);
    }

    async findPermissionsByIds(findPermissionsByIdsQuery: FindPermissionsByIdsQuery) {
        const query = new FindPermissionsByIdsQuery();
        Object.assign(query, findPermissionsByIdsQuery);
        return await this.queryBus.execute(query);
    }

    async findOne(findPermissionQuery: FindPermissionQuery): Promise<PermissionDto> {
        const query = new FindPermissionQuery(findPermissionQuery.id);
        return await this.queryBus.execute(query);
    }
}
