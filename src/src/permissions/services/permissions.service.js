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
const cqrs_1 = require("@nestjs/cqrs");
const create_permission_command_1 = require("../commands/impl/create-permission.command");
const update_permission_command_1 = require("../commands/impl/update-permission.command");
const delete_permission_command_1 = require("../commands/impl/delete-permission.command");
const get_permissions_query_1 = require("permissions/queries/impl/get-permissions.query");
const find_permission_query_1 = require("permissions/queries/impl/find-permission.query");
const send_assign_permission_email_command_1 = require("permissions/commands/impl/send-assign-permission-email.command");
const reply_permission_assign_command_1 = require("permissions/commands/impl/reply-permission-assign.command");
let PermissionsService = class PermissionsService {
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    createPermission(streamId, permissionDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new create_permission_command_1.CreatePermissionCommand(streamId, permissionDto));
        });
    }
    updatePermission(streamId, permissionDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new update_permission_command_1.UpdatePermissionCommand(streamId, permissionDto));
        });
    }
    deletePermission(streamId, permissionIdDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new delete_permission_command_1.DeletePermissionCommand(streamId, permissionIdDto));
        });
    }
    sendAssignPermissionEmail(streamId, permissionAssignDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new send_assign_permission_email_command_1.SendAssignPermissionEmailCommand(streamId, permissionAssignDto));
        });
    }
    replyPermisisonAssign(streamId, permissionResponseDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new reply_permission_assign_command_1.ReplyPermissionAssignCommand(streamId, permissionResponseDto));
        });
    }
    getPermissions(getPermissionsQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new get_permissions_query_1.GetPermissionsQuery();
            Object.assign(query, getPermissionsQuery);
            return yield this.queryBus.execute(query);
        });
    }
    findOne(findPermissionQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new find_permission_query_1.FindPermissionQuery(findPermissionQuery.id);
            return yield this.queryBus.execute(query);
        });
    }
};
PermissionsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], PermissionsService);
exports.PermissionsService = PermissionsService;
//# sourceMappingURL=permissions.service.js.map