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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_dto_1 = require("base/base-entity.dto");
const class_validator_1 = require("class-validator");
const constant_1 = require("common/constant");
const mongodb_1 = require("mongodb");
const typeorm_1 = require("typeorm");
class PermissionAssignDto {
    constructor(assigneeUsername, projectId, permissions, assignerId) {
        this.assigneeUsername = assigneeUsername;
        this.projectId = projectId;
        this.permissions = permissions;
        this.assignerId = assignerId;
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], PermissionAssignDto.prototype, "assigneeUsername", void 0);
__decorate([
    class_validator_1.IsUUID(),
    typeorm_1.Column({
        nullable: false,
        type: 'uuid',
    }),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectID !== "undefined" && mongodb_1.ObjectID) === "function" ? _a : Object)
], PermissionAssignDto.prototype, "projectId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    class_validator_1.IsIn([constant_1.CONSTANTS.PERMISSION.CSR_USER], { each: true }),
    __metadata("design:type", Array)
], PermissionAssignDto.prototype, "permissions", void 0);
__decorate([
    class_validator_1.IsUUID(),
    typeorm_1.Column({
        nullable: false,
        type: 'uuid',
    }),
    __metadata("design:type", typeof (_b = typeof mongodb_1.ObjectID !== "undefined" && mongodb_1.ObjectID) === "function" ? _b : Object)
], PermissionAssignDto.prototype, "assignerId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    typeorm_1.Column({
        nullable: false,
        type: 'uuid',
    }),
    __metadata("design:type", typeof (_c = typeof mongodb_1.ObjectID !== "undefined" && mongodb_1.ObjectID) === "function" ? _c : Object)
], PermissionAssignDto.prototype, "assigneeId", void 0);
exports.PermissionAssignDto = PermissionAssignDto;
class PermissionResponseDto {
    constructor(emailToken, status) {
        this.emailToken = emailToken;
        this.status = status;
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], PermissionResponseDto.prototype, "emailToken", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsIn([
        constant_1.CONSTANTS.STATUS.APPROVED,
        constant_1.CONSTANTS.STATUS.REJECTED
    ]),
    typeorm_1.Column(),
    __metadata("design:type", String)
], PermissionResponseDto.prototype, "status", void 0);
exports.PermissionResponseDto = PermissionResponseDto;
class PermissionIdRequestParamsDto {
    constructor(permissionId) {
        this._id = permissionId;
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], PermissionIdRequestParamsDto.prototype, "_id", void 0);
exports.PermissionIdRequestParamsDto = PermissionIdRequestParamsDto;
let PermissionDto = class PermissionDto extends base_entity_dto_1.BaseEntityDto {
    constructor(permissions, assigneeId, assignerId, projectId, status = constant_1.CONSTANTS.STATUS.PENDING) {
        super();
        this.permissions = permissions;
        this.assigneeId = assigneeId;
        this.assignerId = assignerId;
        this.projectId = projectId;
        this.status = status;
    }
};
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    class_validator_1.IsIn([constant_1.CONSTANTS.PERMISSION.CSR_USER], { each: true }),
    __metadata("design:type", Array)
], PermissionDto.prototype, "permissions", void 0);
__decorate([
    class_validator_1.IsUUID(),
    typeorm_1.Column({
        nullable: false,
        type: 'uuid',
    }),
    __metadata("design:type", typeof (_d = typeof mongodb_1.ObjectID !== "undefined" && mongodb_1.ObjectID) === "function" ? _d : Object)
], PermissionDto.prototype, "assigneeId", void 0);
__decorate([
    class_validator_1.IsUUID(),
    typeorm_1.Column({
        nullable: false,
        type: 'uuid',
    }),
    __metadata("design:type", typeof (_e = typeof mongodb_1.ObjectID !== "undefined" && mongodb_1.ObjectID) === "function" ? _e : Object)
], PermissionDto.prototype, "assignerId", void 0);
__decorate([
    class_validator_1.IsUUID(),
    typeorm_1.Column({
        nullable: false,
        type: 'uuid',
    }),
    __metadata("design:type", typeof (_f = typeof mongodb_1.ObjectID !== "undefined" && mongodb_1.ObjectID) === "function" ? _f : Object)
], PermissionDto.prototype, "projectId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsIn([
        constant_1.CONSTANTS.STATUS.PENDING,
        constant_1.CONSTANTS.STATUS.APPROVED,
        constant_1.CONSTANTS.STATUS.REJECTED,
        constant_1.CONSTANTS.STATUS.INVALID,
    ]),
    typeorm_1.Column(),
    __metadata("design:type", String)
], PermissionDto.prototype, "status", void 0);
PermissionDto = __decorate([
    typeorm_1.Entity('permissions'),
    __metadata("design:paramtypes", [Array, Object, Object, Object, String])
], PermissionDto);
exports.PermissionDto = PermissionDto;
//# sourceMappingURL=permissions.dto.js.map