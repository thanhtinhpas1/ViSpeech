"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const permission_model_1 = require("../models/permission.model");
let PermissionRepository = class PermissionRepository {
    createPermission(streamId, permissionDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const permission = new permission_model_1.Permission(undefined);
            permission.setData(permissionDto);
            permission.createPermission(streamId);
            return permission;
        });
    }
    updatePermission(streamId, permissionDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const permission = new permission_model_1.Permission(undefined);
            permission.setData(permissionDto);
            permission.updatePermission(streamId);
            return permission;
        });
    }
    deletePermission(streamId, permissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const permission = new permission_model_1.Permission(permissionId);
            permission.deletePermission(streamId);
            return permission;
        });
    }
    welcomePermission(streamId, permissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const permission = new permission_model_1.Permission(permissionId);
            permission.welcomePermission(streamId);
            return permission;
        });
    }
    sendAssignPermissionEmail(streamId, permissionAssignDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const permission = new permission_model_1.Permission(undefined);
            permission.setData(permissionAssignDto);
            permission.sendAssignPermissionEmail(streamId);
            return permission;
        });
    }
    replyPermissionAssign(streamId, permissionResponseDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const permission = new permission_model_1.Permission(undefined);
            permission.setData(permissionResponseDto);
            permission.replyPermissionAssign(streamId);
            return permission;
        });
    }
};
PermissionRepository = __decorate([
    common_1.Injectable()
], PermissionRepository);
exports.PermissionRepository = PermissionRepository;
//# sourceMappingURL=permission.repository.js.map