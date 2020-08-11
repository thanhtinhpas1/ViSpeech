import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CONSTANTS } from 'common/constant';
import { FindPermissionQuery } from 'permissions/queries/impl/find-permission.query';
import { GetPermissionsQuery } from 'permissions/queries/impl/get-permissions.query';
import {
    EmailTokenParamsDto,
    PermissionAssignDto,
    PermissionDto,
    PermissionIdRequestParamsDto,
    PermissionResponseDto,
    AssigneePermissionDto
} from '../dtos/permissions.dto';
import { PermissionsService } from '../services/permissions.service';
import { Roles } from 'auth/roles.decorator';
import {
    AssignPermissionGuard,
    PermissionGuard,
    PermissionQueryGuard,
    ReplyPermissionAssignGuard,
    UpdatePermissionExpirationDateGuard,
    DeletePermissionForAssigneeGuard
} from 'auth/guards/permission.guard';
import { Utils } from 'utils';
import { FindPermissionsByIdsQuery } from 'permissions/queries/impl/find-permissions-by-ids.query';
import { JwtService } from '@nestjs/jwt';

@Controller('permissions')
@ApiTags('Permissions')
export class PermissionsController {
    constructor(
        private readonly permissionsService: PermissionsService,
        private readonly jwtService: JwtService) {
    }

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Create Permission'] })
    @ApiResponse({ status: 200, description: 'Create Permission.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), PermissionGuard)
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Post()
    async createPermission(@Body() permissionDto: PermissionDto): Promise<PermissionDto> {
        const streamId = permissionDto._id;
        return this.permissionsService.createPermission(streamId, permissionDto);
    }

    /* Update Permission Expiration Date */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Update Permission Expiration Date'] })
    @ApiResponse({ status: 200, description: 'Update Permission Expiration Date.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), UpdatePermissionExpirationDateGuard)
    @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
    @Put('/update-expiration-date')
    async updatePermissionExpirationDate(
        @Body('assigneePermission') assigneePermissionDto: AssigneePermissionDto,
        @Body('expiresIn') expiresIn: number,
    ) {
        const streamId = assigneePermissionDto.assigneeId;
        return this.permissionsService.updatePermissionExpirationDate(streamId, assigneePermissionDto, expiresIn);
    }

    /* Update Permission */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Update Permission'] })
    @ApiResponse({ status: 200, description: 'Update Permission.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), PermissionGuard)
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Put(':_id')
    async updatePermission(
        @Param() permissionIdDto: PermissionIdRequestParamsDto,
        @Body() permissionDto: PermissionDto,
    ) {
        const streamId = permissionIdDto._id;
        return this.permissionsService.updatePermission(streamId, {
            ...permissionDto,
            _id: permissionIdDto._id,
        });
    }

    /* Delete Permission For Assignee */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Delete Permission For Assignee'] })
    @ApiResponse({ status: 200, description: 'Delete Permission For Assignee.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), DeletePermissionForAssigneeGuard)
    @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
    @Delete('/delete-permission-for-assignee')
    async deletePermissionForAssignee(@Body() assigneePermissionDto: AssigneePermissionDto) {
        const streamId = assigneePermissionDto.assigneeId;
        return this.permissionsService.deletePermissionForAssignee(streamId, assigneePermissionDto);
    }

    /* Delete Permission */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Delete Permission'] })
    @ApiResponse({ status: 200, description: 'Delete Permission.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), PermissionGuard)
    @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
    @Delete(':_id')
    async deletePermission(@Param() permissionIdDto: PermissionIdRequestParamsDto) {
        const streamId = permissionIdDto._id;
        return this.permissionsService.deletePermission(streamId, permissionIdDto);
    }

    /* Send Assign Permission Email */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Send Assign Permission Email'] })
    @ApiResponse({ status: 200, description: 'Send Assign Permission Email.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), AssignPermissionGuard)
    @Post('assign-permission')
    async sendAssignPermissionEmail(@Body() permissionAssignDto: PermissionAssignDto) {
        const streamId = permissionAssignDto.assignerId;
        return this.permissionsService.sendAssignPermissionEmail(streamId, permissionAssignDto);
    }

    /* Reply permission assign */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['Reply permission assign'] })
    @ApiResponse({ status: 200, description: 'Reply permission assign.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ReplyPermissionAssignGuard)
    @Post('reply-permission-assign')
    async replyPermissionAssign(@Body() permissionResponseDto: PermissionResponseDto) {
        const streamId = Utils.getUuid();
        return this.permissionsService.replyPermissionAssign(streamId, permissionResponseDto);
    }

    /* List Permissions */

    /*--------------------------------------------*/
    @ApiOperation({ tags: ['List Permissions'] })
    @ApiResponse({ status: 200, description: 'List Permissions.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), PermissionQueryGuard)
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Get()
    async getPermissions(@Query() getPermissionsQuery: GetPermissionsQuery) {
        return this.permissionsService.getPermissions(getPermissionsQuery);
    }

    /* Find Permission By Email Token */

    /*--------------------------------------------*/

    @ApiOperation({ tags: ['Find Permission By Email Token'] })
    @ApiResponse({ status: 200, description: 'Find Permission By Email Token.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), PermissionQueryGuard)
    @Get('email-token/:emailToken')
    async findPermissionByEmailToken(@Param() param: EmailTokenParamsDto) {
        const decodedToken = this.jwtService.decode(param.emailToken);
        const query = new FindPermissionsByIdsQuery();
        query.assigneeId = decodedToken['assigneeId'];
        query.assignerId = decodedToken['assignerId'];
        query.projectId = decodedToken['projectId'];
        return this.permissionsService.findPermissionsByIds(query);
    }

    /* Find Permission */

    /*--------------------------------------------*/

    @ApiOperation({ tags: ['Find Permission'] })
    @ApiResponse({ status: 200, description: 'Find Permission.' })
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), PermissionQueryGuard)
    @Get(':id')
    async findOnePermission(@Param() findPermissionQuery: FindPermissionQuery) {
        return this.permissionsService.findOne(findPermissionQuery);
    }
}
