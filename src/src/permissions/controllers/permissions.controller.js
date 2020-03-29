"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const constant_1 = require("common/constant");
const find_permission_query_1 = require("permissions/queries/impl/find-permission.query");
const get_permissions_query_1 = require("permissions/queries/impl/get-permissions.query");
const permissions_dto_1 = require("../dtos/permissions.dto");
const permissions_service_1 = require("../services/permissions.service");
const roles_decorator_1 = require("auth/roles.decorator");
const permission_guard_1 = require("auth/guards/permission.guard");
const utils_1 = require("utils");
let PermissionsController = class PermissionsController {
    constructor(permissionsService) {
        this.permissionsService = permissionsService;
    }
    createPermission(permissionDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = permissionDto._id;
            return this.permissionsService.createPermission(streamId, permissionDto);
        });
    }
    updatePermission(permissionIdDto, permissionDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = permissionIdDto._id;
            return this.permissionsService.updatePermission(streamId, Object.assign(Object.assign({}, permissionDto), { _id: permissionIdDto._id }));
        });
    }
    deletePermission(permissionIdDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = permissionIdDto._id;
            return this.permissionsService.deletePermission(streamId, permissionIdDto);
        });
    }
    sendAssignPermissionEmail(permissionAssignDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = permissionAssignDto.assignerId;
            return this.permissionsService.sendAssignPermissionEmail(streamId, permissionAssignDto);
        });
    }
    replyPermisisonAssign(permissionResponseDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const streamId = utils_1.Utils.getUuid();
            return this.permissionsService.replyPermisisonAssign(streamId, permissionResponseDto);
        });
    }
    getPermissions(getPermissionsQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.permissionsService.getPermissions(getPermissionsQuery);
        });
    }
    findOnePermission(findPermissionQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.permissionsService.findOne(findPermissionQuery);
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ tags: ['Create Permission'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Create Permission.' }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permissions_dto_1.PermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "createPermission", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Update Permission'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Update Permission.' }),
    common_1.Put(':_id'),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permissions_dto_1.PermissionIdRequestParamsDto,
        permissions_dto_1.PermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "updatePermission", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Delete Permission'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Delete Permission.' }),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.ADMIN, constant_1.CONSTANTS.ROLE.MANAGER_USER]),
    common_1.Delete(':_id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permissions_dto_1.PermissionIdRequestParamsDto]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "deletePermission", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Send Assign Permission Email'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Send Assign Permission Email.' }),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), permission_guard_1.AssignPermissionGuard),
    common_1.Post('assign-permission'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permissions_dto_1.PermissionAssignDto]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "sendAssignPermissionEmail", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Reply permission assign'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Reply permission assign.' }),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), permission_guard_1.ReplyPermisisonAssignGuard),
    common_1.Post('reply-permission-assign'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permissions_dto_1.PermissionResponseDto]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "replyPermisisonAssign", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['List Permissions'] }),
    swagger_1.ApiResponse({ status: 200, description: 'List Permissions.' }),
    roles_decorator_1.Roles([constant_1.CONSTANTS.ROLE.ADMIN]),
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_permissions_query_1.GetPermissionsQuery]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "getPermissions", null);
__decorate([
    swagger_1.ApiOperation({ tags: ['Find Permission'] }),
    swagger_1.ApiResponse({ status: 200, description: 'Find Permission.' }),
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_permission_query_1.FindPermissionQuery]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "findOnePermission", null);
PermissionsController = __decorate([
    common_1.Controller('permissions'),
    swagger_1.ApiTags('Permissions'),
    common_1.UseGuards(passport_1.AuthGuard(constant_1.CONSTANTS.AUTH_JWT), permission_guard_1.PermissionGuard),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService])
], PermissionsController);
exports.PermissionsController = PermissionsController;
//# sourceMappingURL=permissions.controller.js.map